<?php
/**
 * Nexera Smart - Private Email Configuration Template
 *
 * CRITICAL SECURITY INSTRUCTION:
 * 1. Log in to cPanel.
 * 2. Open File Manager.
 * 3. Go to your home directory: /home/nexerave/ (ONE LEVEL ABOVE public_html).
 * 4. Create a folder named "config" if it doesn't already exist: /home/nexerave/config/
 * 5. Create or upload this file as: /home/nexerave/config/email_config.php
 * 6. Replace 'YOUR_MAILBOX_PASSWORD_HERE' below with the actual password for info@nexeravendingmachine.ae.
 * 7. Set file permissions to 0600 or 0640.
 *
 * DO NOT put this file or your password inside public_html or in git!
 */

return [
    'smtp_host'   => 'mail.nexeravendingmachine.ae',
    'smtp_port'   => 465,
    'smtp_secure' => 'ssl', // SSL/TLS encryption
    'smtp_user'   => 'info@nexeravendingmachine.ae',
    'smtp_pass'   => 'YOUR_MAILBOX_PASSWORD_HERE', // <-- Enter your password here in cPanel
    'to_email'    => 'info@nexeravendingmachine.ae',
    'to_name'     => 'Nexera Smart Enquiries',
    'from_email'  => 'info@nexeravendingmachine.ae',
    'from_name'   => 'Nexera Smart Web Enquiry',

    // Optional: Array of trusted reverse proxy IP addresses (e.g. if using Cloudflare).
    // When left empty or omitted, rate limiting uses REMOTE_ADDR exclusively.
    // 'trusted_proxies' => [],
];
