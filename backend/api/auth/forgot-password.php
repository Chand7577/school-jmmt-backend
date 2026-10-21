<?php
/**
 * Authentication API - Forgot Password Endpoint
 * 
 * POST /api/auth/forgot-password.php
 * Handles initiating a password reset request and dispatching email
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../includes/auth.php';
require_once '../../includes/mailer.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['email'])) {
        sendJsonResponse(['success' => false, 'message' => 'Please provide an email or username.'], 400);
    }

    $rawInput = trim($input['email']);
    $pdo = getDbConnection();

    // 1. Ensure password_resets table exists
    $createTableSql = "CREATE TABLE IF NOT EXISTS password_resets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        token VARCHAR(128) NOT NULL,
        expires_at DATETIME NOT NULL,
        used TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_token (token)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    $pdo->exec($createTableSql);

    // 2. Resolve admin user by exact email OR username alias (username@gmail.com convention)
    //    Do NOT fall back to a hardcoded email — that would send a reset link for any input.
    $alias = (strpos($rawInput, '@') === false) ? $rawInput . '@gmail.com' : null;

    if ($alias !== null) {
        // Input looks like a plain username — try both the raw value and the alias
        $stmt = executeQuery(
            $pdo,
            "SELECT id, email, full_name, is_active FROM admin_users WHERE (email = ? OR email = ?) AND is_active = 1 LIMIT 1",
            [$rawInput, $alias]
        );
    } else {
        // Input is an email — match exactly
        $stmt = executeQuery(
            $pdo,
            "SELECT id, email, full_name, is_active FROM admin_users WHERE email = ? AND is_active = 1 LIMIT 1",
            [$rawInput]
        );
    }
    $admin = $stmt->fetch();

    if ($admin) {
        $adminAccountEmail = $admin['email'];
        $recipientName = $admin['full_name'] ?: 'Administrator';
        
        // Delivered to designated administrator email
        $targetEmail = defined('ADMIN_RECOVERY_EMAIL') ? ADMIN_RECOVERY_EMAIL : 'amritchand0713@gmail.com';

        // Invalidate old tokens
        executeQuery(
            $pdo, 
            "UPDATE password_resets SET used = 1 WHERE email = ? AND used = 0", 
            [$adminAccountEmail]
        );

        // Generate 64-character secure token
        $token = bin2hex(random_bytes(32));
        $expiryMinutes = 30;
        $expiresAt = date('Y-m-d H:i:s', time() + ($expiryMinutes * 60));

        // Insert new token
        executeQuery(
            $pdo,
            "INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)",
            [$adminAccountEmail, $token, $expiresAt]
        );

        // Determine current site base URL
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'jmmt.org.in';
        $resetUrl = "{$protocol}://{$host}/admin?token={$token}";

        // Send email directly to the designated admin email
        $subject = "Password Reset Request - John Martyn Memorial School";
        $htmlBody = getPasswordResetEmailTemplate($recipientName, $resetUrl, $expiryMinutes);
        $textBody = "Hello {$recipientName},\n\nYou requested a password reset for the John Martyn Memorial School admin portal.\n\nPlease reset your password using this link: {$resetUrl}\n\nThis link expires in {$expiryMinutes} minutes.";

        sendSchoolEmail($targetEmail, $recipientName, $subject, $htmlBody, $textBody);
    }

    // Always respond with success to prevent email enumeration
    sendJsonResponse([
        'success' => true,
        'message' => 'If an account exists with this email, a password reset link has been sent.'
    ]);

} catch (Exception $e) {
    error_log("Forgot password error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to process password reset request. Please try again.'
    ], 500);
}
?>
