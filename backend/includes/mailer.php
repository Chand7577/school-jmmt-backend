<?php
/**
 * School Mailer Helper
 * 
 * Sends emails using direct SMTP (SSL/TLS) or PHP native mail() fallback.
 * Includes responsive, branded HTML templates for password resets.
 */

require_once __DIR__ . '/../config/mail.php';

/**
 * Send an email via SMTP socket or PHP mail() fallback
 * 
 * @param string $toEmail Recipient email address
 * @param string $toName Recipient display name
 * @param string $subject Email subject line
 * @param string $htmlBody HTML content
 * @param string $textBody Plain text fallback
 * @return bool True on success, false on failure
 */
function sendSchoolEmail($toEmail, $toName, $subject, $htmlBody, $textBody = '') {
    // If SMTP credentials are provided, attempt SMTP socket delivery
    if (!empty(SMTP_PASS) && !empty(SMTP_USER)) {
        try {
            $smtpSuccess = sendViaSocketSMTP($toEmail, $toName, $subject, $htmlBody, $textBody);
            if ($smtpSuccess) {
                return true;
            }
        } catch (Exception $e) {
            error_log("SMTP send error: " . $e->getMessage() . " - Falling back to mail()");
        }
    }

    // Fallback: standard PHP mail() function (supported natively on Hostinger)
    return sendViaPhpMail($toEmail, $toName, $subject, $htmlBody, $textBody);
}

/**
 * Send email using PHP mail()
 */
function sendViaPhpMail($toEmail, $toName, $subject, $htmlBody, $textBody = '') {
    $boundary = "==Multipart_Boundary_x" . md5(time()) . "x";
    
    $from = MAIL_FROM_NAME . " <" . MAIL_FROM_EMAIL . ">";
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "From: $from\r\n";
    $headers .= "Reply-To: " . MAIL_FROM_EMAIL . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

    $message  = "--$boundary\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= ($textBody ?: strip_tags($htmlBody)) . "\r\n\r\n";

    $message .= "--$boundary\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $htmlBody . "\r\n\r\n";
    $message .= "--$boundary--";

    $to = !empty($toName) ? "$toName <$toEmail>" : $toEmail;

    return @mail($to, $subject, $message, $headers);
}

/**
 * Send email using lightweight direct SMTP socket
 */
function sendViaSocketSMTP($toEmail, $toName, $subject, $htmlBody, $textBody = '') {
    $timeout = 15;
    $host = SMTP_HOST;
    $port = SMTP_PORT;

    $socketHost = ($port === 465 || SMTP_ENCRYPTION === 'ssl') ? "ssl://$host" : $host;
    $socket = @fsockopen($socketHost, $port, $errno, $errstr, $timeout);

    if (!$socket) {
        throw new Exception("Could not connect to SMTP host $host:$port ($errstr)");
    }

    $readResponse = function() use ($socket) {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    };

    $sendCommand = function($cmd, $expectedCode) use ($socket, $readResponse) {
        fputs($socket, $cmd . "\r\n");
        $res = $readResponse();
        $code = substr($res, 0, 3);
        if ($code !== (string)$expectedCode) {
            throw new Exception("SMTP command failed: $cmd | Response: $res");
        }
        return $res;
    };

    // Greeting
    $readResponse();

    // EHLO
    $sendCommand("EHLO " . (gethostname() ?: 'localhost'), 250);

    // TLS if port 587
    if ($port === 587 && SMTP_ENCRYPTION === 'tls') {
        $sendCommand("STARTTLS", 220);
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $sendCommand("EHLO " . (gethostname() ?: 'localhost'), 250);
    }

    // AUTH LOGIN
    $sendCommand("AUTH LOGIN", 334);
    $sendCommand(base64_encode(SMTP_USER), 334);
    $sendCommand(base64_encode(SMTP_PASS), 235);

    // MAIL FROM / RCPT TO
    $sendCommand("MAIL FROM: <" . MAIL_FROM_EMAIL . ">", 250);
    $sendCommand("RCPT TO: <$toEmail>", 250);

    // DATA
    $sendCommand("DATA", 354);

    $boundary = "==Multipart_Boundary_x" . md5(time()) . "x";
    $from = MAIL_FROM_NAME . " <" . MAIL_FROM_EMAIL . ">";
    $to = !empty($toName) ? "$toName <$toEmail>" : $toEmail;

    $emailData  = "From: $from\r\n";
    $emailData .= "To: $to\r\n";
    $emailData .= "Subject: $subject\r\n";
    $emailData .= "Date: " . date("r") . "\r\n";
    $emailData .= "MIME-Version: 1.0\r\n";
    $emailData .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n\r\n";

    $emailData .= "--$boundary\r\n";
    $emailData .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $emailData .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $emailData .= ($textBody ?: strip_tags($htmlBody)) . "\r\n\r\n";

    $emailData .= "--$boundary\r\n";
    $emailData .= "Content-Type: text/html; charset=UTF-8\r\n";
    $emailData .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $emailData .= $htmlBody . "\r\n\r\n";
    $emailData .= "--$boundary--\r\n.";

    $sendCommand($emailData, 250);
    $sendCommand("QUIT", 221);
    fclose($socket);

    return true;
}

/**
 * Generate a branded Password Reset email template
 */
function getPasswordResetEmailTemplate($recipientName, $resetUrl, $expiryMinutes = 30) {
    return '
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Reset Your Password</title>
      <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fc; color: #1e293b; }
        .wrapper { width: 100%; max-width: 580px; margin: 30px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .header { background: #1E2A44; padding: 32px 24px; text-align: center; }
        .header h1 { margin: 12px 0 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 4px 0 0; color: #E8B923; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
        .content { padding: 36px 32px; }
        .greeting { font-size: 16px; font-weight: 700; color: #1E2A44; margin-bottom: 12px; }
        .text { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px; }
        .button-wrap { text-align: center; margin: 32px 0; }
        .button { display: inline-block; background: #E8B923; color: #1E2A44 !important; font-size: 14px; font-weight: 800; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(232,185,35,0.3); }
        .link-alt { font-size: 12px; color: #64748b; word-break: break-all; margin-top: 16px; }
        .notice { background: #fef9c3; border-left: 4px solid #E8B923; padding: 12px 16px; border-radius: 4px; font-size: 12px; color: #713f12; margin: 24px 0 0; }
        .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>John Martyn Memorial School</h1>
          <p>Admin Portal Security</p>
        </div>
        <div class="content">
          <div class="greeting">Hello ' . htmlspecialchars($recipientName) . ',</div>
          <p class="text">We received a request to reset the administrator password for your account. Click the button below to choose a new password.</p>
          <div class="button-wrap">
            <a href="' . htmlspecialchars($resetUrl) . '" class="button" target="_blank">Reset Administrator Password</a>
          </div>
          <p class="text">Or copy and paste this link into your browser:</p>
          <p class="link-alt"><a href="' . htmlspecialchars($resetUrl) . '" style="color:#1E2A44;">' . htmlspecialchars($resetUrl) . '</a></p>
          <div class="notice">
            <strong>Security Notice:</strong> This reset link will expire in <strong>' . intval($expiryMinutes) . ' minutes</strong>. If you did not request this password reset, please ignore this email.
          </div>
        </div>
        <div class="footer">
          &copy; ' . date('Y') . ' John Martyn Memorial School. Salangaon, Dehradun.
        </div>
      </div>
    </body>
    </html>
    ';
}
?>
