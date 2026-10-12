<?php
/**
 * Nexera Smart - Server-side Contact Form Email Handler
 *
 * Handles authenticated SMTP email delivery via PHPMailer for cPanel / LiteSpeed.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 1. REQUEST SIZE LIMIT (Max 50 KB)
// -----------------------------------------------------------------------------
$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 51200) {
    http_response_code(413);
    echo json_encode([
        'success' => false,
        'message' => 'Payload Too Large. Maximum allowed request size is 50 KB.'
    ]);
    exit;
}

$rawInput = file_get_contents('php://input');
if ($rawInput === false || strlen($rawInput) > 51200) {
    http_response_code(413);
    echo json_encode([
        'success' => false,
        'message' => 'Payload Too Large. Maximum allowed request size is 50 KB.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 2. LOAD PRIVATE SMTP CONFIGURATION (Outside public_html)
// -----------------------------------------------------------------------------
$possibleConfigPaths = [
    '/home/nexerave/config/email_config.php',
    '/home/nexerave/email_config.php',
    (isset($_SERVER['DOCUMENT_ROOT']) ? dirname($_SERVER['DOCUMENT_ROOT']) . '/config/email_config.php' : ''),
    (isset($_SERVER['DOCUMENT_ROOT']) ? dirname($_SERVER['DOCUMENT_ROOT']) . '/email_config.php' : ''),
    realpath(__DIR__ . '/../../server-config/email_config.php') ?: '',
];

$config = null;
foreach ($possibleConfigPaths as $cfgPath) {
    if (!empty($cfgPath) && file_exists($cfgPath) && is_readable($cfgPath)) {
        $loaded = include $cfgPath;
        if (is_array($loaded)) {
            $config = $loaded;
            break;
        }
    }
}

// -----------------------------------------------------------------------------
// 3. RATE LIMITING WITH ATOMIC FILE LOCKING & RESERVATION
//    Uses REMOTE_ADDR unless trusted_proxies are explicitly configured.
// -----------------------------------------------------------------------------
function getClientIp(?array $config): string {
    $remoteAddr = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $trustedProxies = $config['trusted_proxies'] ?? [];

    if (!empty($trustedProxies) && is_array($trustedProxies) && in_array($remoteAddr, $trustedProxies, true)) {
        $headers = [
            'HTTP_CF_CONNECTING_IP',
            'HTTP_X_REAL_IP',
            'HTTP_X_FORWARDED_FOR',
        ];
        foreach ($headers as $h) {
            if (!empty($_SERVER[$h])) {
                $ips = explode(',', (string)$_SERVER[$h]);
                $firstIp = trim($ips[0]);
                if (filter_var($firstIp, FILTER_VALIDATE_IP)) {
                    return $firstIp;
                }
            }
        }
    }

    return filter_var($remoteAddr, FILTER_VALIDATE_IP) ? $remoteAddr : '0.0.0.0';
}

$clientIp = getClientIp($config);
$rateLimitDir = sys_get_temp_dir() . '/nexera_rate_limits';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0755, true);
}

$rateFile = $rateLimitDir . '/' . hash('sha256', 'contact_' . $clientIp) . '.json';
$now = time();
$windowSeconds = 600; // 10 minutes
$maxAttempts = 4;

$fp = @fopen($rateFile, 'c+');
if ($fp === false) {
    error_log('[Nexera Email Handler] Could not open rate limit file: ' . $rateFile);
} else {
    if (flock($fp, LOCK_EX)) {
        $content = '';
        $filesize = @filesize($rateFile);
        if ($filesize && $filesize > 0) {
            $content = (string)fread($fp, $filesize);
        }
        $attempts = [];
        if ($content !== '') {
            $decoded = json_decode($content, true);
            if (is_array($decoded)) {
                $attempts = array_filter($decoded, fn($t) => is_int($t) && ($now - $t) < $windowSeconds);
            }
        }

        if (count($attempts) >= $maxAttempts) {
            flock($fp, LOCK_UN);
            fclose($fp);
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => 'Too many requests. Please wait a few minutes before submitting another enquiry.'
            ]);
            exit;
        }

        // Reserve attempt BEFORE SMTP sending
        $attempts[] = $now;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode(array_values($attempts)));
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
    } else {
        fclose($fp);
    }
}

// -----------------------------------------------------------------------------
// 4. PARSE AND VALIDATE INPUT
// -----------------------------------------------------------------------------
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON payload received.'
    ]);
    exit;
}

// Honeypot check - reject bot submissions with 400
if (
    (!empty($input['_hp']) && is_string($input['_hp']) && trim($input['_hp']) !== '') ||
    (!empty($input['website_address_hp']) && is_string($input['website_address_hp']) && trim($input['website_address_hp']) !== '')
) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Spam verification failed.'
    ]);
    exit;
}

// Validate field types before any casting
$expectedStringFields = [
    'full_name',
    'company_name',
    'email',
    'phone',
    'location',
    'property_type',
    'rider_footfall',
    'partnership_interest',
    'message',
];

$typeErrors = [];
foreach ($expectedStringFields as $field) {
    if (array_key_exists($field, $input)) {
        if ($input[$field] !== null && !is_string($input[$field])) {
            $typeErrors[] = "Field '{$field}' must be a string.";
        }
    }
}

if (!empty($typeErrors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $typeErrors)
    ]);
    exit;
}

// Require consent to be strictly boolean true
if (!isset($input['consent']) || $input['consent'] !== true) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => 'Consent must be explicitly granted (boolean true).'
    ]);
    exit;
}

// Extract trimmed strings
$fullName            = trim((string)($input['full_name'] ?? ''));
$companyName         = trim((string)($input['company_name'] ?? ''));
$email               = trim((string)($input['email'] ?? ''));
$phone               = trim((string)($input['phone'] ?? ''));
$location            = trim((string)($input['location'] ?? ''));
$propertyType        = trim((string)($input['property_type'] ?? ''));
$riderFootfall       = trim((string)($input['rider_footfall'] ?? ''));
$partnershipInterest = trim((string)($input['partnership_interest'] ?? ''));
$message             = trim((string)($input['message'] ?? ''));

// Validate required values and format
$validationErrors = [];
if ($fullName === '' || mb_strlen($fullName) < 2) {
    $validationErrors[] = 'Full name is required (minimum 2 characters).';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $validationErrors[] = 'A valid email address is required.';
}

// Boundary enforcement
if (mb_strlen($fullName) > 100) $fullName = mb_substr($fullName, 0, 100);
if (mb_strlen($companyName) > 120) $companyName = mb_substr($companyName, 0, 120);
if (mb_strlen($phone) > 50) $phone = mb_substr($phone, 0, 50);
if (mb_strlen($location) > 200) $location = mb_substr($location, 0, 200);
if (mb_strlen($propertyType) > 100) $propertyType = mb_substr($propertyType, 0, 100);
if (mb_strlen($riderFootfall) > 100) $riderFootfall = mb_substr($riderFootfall, 0, 100);
if (mb_strlen($partnershipInterest) > 100) $partnershipInterest = mb_substr($partnershipInterest, 0, 100);
if (mb_strlen($message) > 3000) $message = mb_substr($message, 0, 3000);

if (!empty($validationErrors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $validationErrors)
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 5. VERIFY SMTP CONFIGURATION
// -----------------------------------------------------------------------------
if (!$config || empty($config['smtp_pass']) || $config['smtp_pass'] === 'YOUR_MAILBOX_PASSWORD_HERE') {
    error_log('[Nexera Email Handler] Private configuration missing or SMTP password not set in /home/nexerave/config/email_config.php');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email dispatch is not configured on the server. Please contact us directly via WhatsApp or phone.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 6. PHPMailer INITIALIZATION & DELIVERY
// -----------------------------------------------------------------------------
require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'] ?? 'mail.nexeravendingmachine.ae';
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'] ?? 'info@nexeravendingmachine.ae';
    $mail->Password   = (string)$config['smtp_pass'];

    // SSL on Port 465
    $port = (int)($config['smtp_port'] ?? 465);
    $mail->Port = $port;
    if ($port === 465) {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } else {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    if (!empty($config['smtp_options']) && is_array($config['smtp_options'])) {
        $mail->SMTPOptions = $config['smtp_options'];
    }

    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 15;

    // Fixed Sender & Recipient (Never user-controlled)
    $fromEmail = $config['from_email'] ?? 'info@nexeravendingmachine.ae';
    $fromName  = $config['from_name'] ?? 'Nexera Smart Web Enquiry';
    $mail->setFrom($fromEmail, $fromName);

    $toEmail = $config['to_email'] ?? 'info@nexeravendingmachine.ae';
    $toName  = $config['to_name'] ?? 'Nexera Smart Team';
    $mail->addAddress($toEmail, $toName);

    // Reply-To points to visitor's validated email
    $mail->addReplyTo($email, $fullName);

    // Subject
    $subjectLocation = $location !== '' ? " ({$location})" : '';
    $subjectProperty = $propertyType !== '' ? " - {$propertyType}" : '';
    $mail->Subject = "New Location Enquiry: {$fullName}{$subjectProperty}{$subjectLocation}";

    // HTML Body
    $safeFullName = htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8');
    $safeCompany  = htmlspecialchars($companyName !== '' ? $companyName : 'Not specified', ENT_QUOTES, 'UTF-8');
    $safeEmail    = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safePhone    = htmlspecialchars($phone !== '' ? $phone : 'Not provided', ENT_QUOTES, 'UTF-8');
    $safeLocation = htmlspecialchars($location !== '' ? $location : 'Not specified', ENT_QUOTES, 'UTF-8');
    $safeProperty = htmlspecialchars($propertyType !== '' ? $propertyType : 'Not specified', ENT_QUOTES, 'UTF-8');
    $safeFootfall = htmlspecialchars($riderFootfall !== '' ? $riderFootfall : 'Not specified', ENT_QUOTES, 'UTF-8');
    $safeInterest = htmlspecialchars($partnershipInterest !== '' ? $partnershipInterest : 'Not specified', ENT_QUOTES, 'UTF-8');
    $safeMessage  = nl2br(htmlspecialchars($message !== '' ? $message : 'None provided', ENT_QUOTES, 'UTF-8'));
    $formattedDate = date('Y-m-d H:i:s T');

    $htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F3F7FB; margin: 0; padding: 24px; color: #082B59; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #D7E3F1; box-shadow: 0 4px 12px rgba(8,43,89,0.06); }
    .header { background: #082B59; padding: 24px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { color: #00BFD8; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; }
    .content { padding: 28px 24px; }
    .badge { display: inline-block; background: #E6F2FC; color: #0876D9; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th, td { padding: 10px 12px; text-align: left; font-size: 14px; border-bottom: 1px solid #EEF3F8; vertical-align: top; }
    th { width: 38%; color: #516F90; font-weight: 600; }
    td { width: 62%; color: #082B59; font-weight: 500; }
    .message-box { background: #F8FAFD; border-left: 4px solid #0876D9; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-top: 16px; }
    .footer { background: #F8FAFD; padding: 16px 24px; text-align: center; font-size: 12px; color: #7B93AC; border-top: 1px solid #EEF3F8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NEXERA SMART</h1>
      <p>NEW LOCATION & PARTNERSHIP ENQUIRY</p>
    </div>
    <div class="content">
      <div class="badge">Submitted via Website Contact Form</div>
      <table>
        <tr><th>Submitter Name</th><td><strong>{$safeFullName}</strong></td></tr>
        <tr><th>Email Address</th><td><a href="mailto:{$safeEmail}" style="color: #0876D9;">{$safeEmail}</a></td></tr>
        <tr><th>Phone / Mobile</th><td><a href="tel:{$safePhone}" style="color: #0876D9;">{$safePhone}</a></td></tr>
        <tr><th>Company / Business</th><td>{$safeCompany}</td></tr>
        <tr><th>Location / Area</th><td>{$safeLocation}</td></tr>
        <tr><th>Property Type</th><td>{$safeProperty}</td></tr>
        <tr><th>Rider Footfall</th><td>{$safeFootfall}</td></tr>
        <tr><th>Partnership Model</th><td>{$safeInterest}</td></tr>
        <tr><th>Submission Time</th><td>{$formattedDate}</td></tr>
      </table>

      <h3 style="font-size: 14px; color: #082B59; margin: 20px 0 8px 0;">Message / Details:</h3>
      <div class="message-box">
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #082B59;">{$safeMessage}</p>
      </div>
    </div>
    <div class="footer">
      Sent from the official Nexera Smart website contact form.<br>
      Reply directly to this email to respond to <strong>{$safeFullName}</strong> ({$safeEmail}).
    </div>
  </div>
</body>
</html>
HTML;

    $altBody = <<<TEXT
NEXERA SMART - NEW LOCATION PARTNERSHIP ENQUIRY
===============================================

Submitter Name:       {$fullName}
Email Address:        {$email}
Phone Number:         {$phone}
Company:              {$companyName}
Location:             {$location}
Property Type:        {$propertyType}
Rider Footfall:       {$riderFootfall}
Partnership Model:    {$partnershipInterest}
Submission Time:      {$formattedDate}

Message / Comments:
-------------------
{$message}

---
Reply directly to this email to contact the submitter at {$email}.
TEXT;

    $mail->isHTML(true);
    $mail->Body    = $htmlBody;
    $mail->AltBody = $altBody;

    $mail->send();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your enquiry has been dispatched to our mail server successfully.'
    ]);
} catch (Exception $e) {
    error_log("[Nexera Email Handler] PHPMailer Error: {$mail->ErrorInfo} | Exception: {$e->getMessage()}");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to dispatch email notification at this time. Please contact us directly via WhatsApp or phone.'
    ]);
} catch (\Throwable $e) {
    error_log("[Nexera Email Handler] Unexpected Error: {$e->getMessage()}");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while processing your enquiry. Please reach us via WhatsApp or phone.'
    ]);
}
