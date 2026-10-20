<?php
/**
 * Mail / SMTP Configuration
 * 
 * Pre-configured for Hostinger Email (Unlimited Plan includes free email accounts).
 * You can also set SMTP_USER and SMTP_PASS to your Hostinger mailbox credentials,
 * or leave SMTP_PASS empty to use PHP's native mail() function on Hostinger.
 */

define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.hostinger.com');
define('SMTP_PORT', intval(getenv('SMTP_PORT') ?: 465));
define('SMTP_ENCRYPTION', getenv('SMTP_ENCRYPTION') ?: 'ssl'); // 'ssl' or 'tls'
define('SMTP_USER', getenv('SMTP_USER') ?: 'admin@jmmt.org.in');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');
define('MAIL_FROM_EMAIL', getenv('MAIL_FROM_EMAIL') ?: 'admin@jmmt.org.in');
define('MAIL_FROM_NAME', getenv('MAIL_FROM_NAME') ?: 'John Martyn Memorial School');
define('ADMIN_RECOVERY_EMAIL', getenv('ADMIN_RECOVERY_EMAIL') ?: 'amritchand0713@gmail.com');
?>
