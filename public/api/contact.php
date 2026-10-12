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
// 1. RATE LIMITING (Max 3 submissions per IP per 10 minutes)
// -----------------------------------------------------------------------------
function getClientIp(): string {
    $headers = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_REAL_IP',
        'HTTP_X_FORWARDED_FOR',
        'REMOTE_ADDR'
    ];
    foreach ($headers as $h) {
        if (!empty($_SERVER[$h])) {
            $ipList = explode(',', $_SERVER[$h]);
            $ip = trim($ipList[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return '0.0.0.0';
}

$clientIp = getClientIp();
$rateLimitDir = sys_get_temp_dir() . '/nexera_rate_limits';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0755, true);
}

$rateFile = $rateLimitDir . '/' . md5('contact_' . $clientIp) . '.json';
$now = time();
$windowSeconds = 600; // 10 minutes
$maxAttempts = 4;

$attempts = [];
if (file_exists($rateFile)) {
    $data = @json_decode((string)file_get_contents($rateFile), true);
    if (is_array($data)) {
        $attempts = array_filter($data, fn($t) => ($now - $t) < $windowSeconds);
    }
}

if (count($attempts) >= $maxAttempts) {
    http_response_code(429);
    echo json_encode([
        'success' => false,
        'message' => 'Too many requests. Please wait a few minutes before submitting another enquiry.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 2. PARSE AND SANITIZE INPUT
// -----------------------------------------------------------------------------
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid JSON payload received.'
    ]);
    exit;
}

// Spam Trap 1: Honeypot check
if (!empty($input['_hp']) || !empty($input['website_address_hp'])) {
    // Silently accept without sending to avoid informing bots
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for reaching out.'
    ]);
    exit;
}

// Spam Trap 2: Minimum submission time (prevent instant programmatic spam)
if (isset($input['_ts']) && is_numeric($input['_ts'])) {
    $elapsed = ($now * 1000) - (float)$input['_ts'];
    if ($elapsed < 1500) { // Under 1.5 seconds from form load is likely a bot
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for reaching out.'
        ]);
        exit;
    }
}

// Field extraction & sanitization
$fullName            = trim((string)($input['full_name'] ?? ''));
$companyName         = trim((string)($input['company_name'] ?? ''));
$email               = trim((string)($input['email'] ?? ''));
$phone               = trim((string)($input['phone'] ?? ''));
$location            = trim((string)($input['location'] ?? ''));
$propertyType        = trim((string)($input['property_type'] ?? ''));
$riderFootfall       = trim((string)($input['rider_footfall'] ?? ''));
$partnershipInterest = trim((string)($input['partnership_interest'] ?? ''));
$message             = trim((string)($input['message'] ?? ''));
$consent             = !empty($input['consent']);

// Validation
$errors = [];
if ($fullName === '' || mb_strlen($fullName) < 2) {
    $errors[] = 'Full name is required (minimum 2 characters).';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if (!$consent) {
    $errors[] = 'You must agree to the processing of your contact details.';
}

// Character length boundaries
if (mb_strlen($fullName) > 100) $fullName = mb_substr($fullName, 0, 100);
if (mb_strlen($companyName) > 120) $companyName = mb_substr($companyName, 0, 120);
if (mb_strlen($phone) > 50) $phone = mb_substr($phone, 0, 50);
if (mb_strlen($location) > 200) $location = mb_substr($location, 0, 200);
if (mb_strlen($propertyType) > 100) $propertyType = mb_substr($propertyType, 0, 100);
if (mb_strlen($riderFootfall) > 100) $riderFootfall = mb_substr($riderFootfall, 0, 100);
if (mb_strlen($partnershipInterest) > 100) $partnershipInterest = mb_substr($partnershipInterest, 0, 100);
if (mb_strlen($message) > 3000) $message = mb_substr($message, 0, 3000);

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'message' => implode(' ', $errors)
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 3. LOAD PRIVATE SMTP CONFIGURATION (Outside public_html)
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
// 4. PHPMailer INITIALIZATION & DELIVERY
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

    // Reply-To points to the visitor's verified email
    $mail->addReplyTo($email, $fullName);

    // Subject
    $subjectLocation = $location !== '' ? " ($location)" : '';
    $subjectProperty = $propertyType !== '' ? " - $propertyType" : '';
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
        <tr><th>Submitter IP</th><td>{$clientIp}</td></tr>
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
Submitter IP:         {$clientIp}

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

    // Record rate limit attempt
    $attempts[] = $now;
    @file_put_contents($rateFile, json_encode($attempts));

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your enquiry has been successfully delivered to the Nexera Smart team.'
    ]);
} catch (Exception $e) {
    error_log("[Nexera Email Handler] PHPMailer Error: {$mail->ErrorInfo} | Exception: {$e->getMessage()}");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to send email notification at this moment. Our team has been notified. Please try again or reach us via WhatsApp.'
    ]);
} catch (\Throwable $e) {
    error_log("[Nexera Email Handler] Unexpected Error: {$e->getMessage()}");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'A server error occurred while processing your email. Please reach us via WhatsApp.'
    ]);
}
