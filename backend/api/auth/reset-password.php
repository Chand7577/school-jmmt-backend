<?php
/**
 * Authentication API - Reset Password Endpoint
 * 
 * GET  /api/auth/reset-password.php?token=xyz -> verify token validity
 * POST /api/auth/reset-password.php -> update password with token
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../includes/auth.php';

try {
    $pdo = getDbConnection();

    // 1. Verify Token (GET)
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $token = trim($_GET['token'] ?? '');
        if (empty($token)) {
            sendJsonResponse(['success' => false, 'message' => 'Token is required'], 400);
        }

        $stmt = executeQuery(
            $pdo,
            "SELECT id, email, expires_at, used FROM password_resets WHERE token = ? AND used = 0 LIMIT 1",
            [$token]
        );
        $resetRecord = $stmt->fetch();

        if (!$resetRecord || strtotime($resetRecord['expires_at']) < time()) {
            sendJsonResponse(['success' => false, 'message' => 'This password reset link is invalid or has expired.'], 400);
        }

        sendJsonResponse([
            'success' => true,
            'valid' => true,
            'message' => 'Token is valid'
        ]);
    }

    // 2. Submit New Password (POST)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!$input) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid JSON input'], 400);
        }

        $token = trim($input['token'] ?? '');
        $password = trim($input['password'] ?? '');

        if (empty($token) || empty($password)) {
            sendJsonResponse(['success' => false, 'message' => 'Token and new password are required.'], 400);
        }

        if (strlen($password) < 4) {
            sendJsonResponse(['success' => false, 'message' => 'Password must be at least 4 characters long.'], 400);
        }

        // Check token validity
        $stmt = executeQuery(
            $pdo,
            "SELECT id, email, expires_at, used FROM password_resets WHERE token = ? AND used = 0 LIMIT 1",
            [$token]
        );
        $resetRecord = $stmt->fetch();

        if (!$resetRecord || strtotime($resetRecord['expires_at']) < time()) {
            sendJsonResponse(['success' => false, 'message' => 'This password reset link is invalid or has expired.'], 400);
        }

        // Hash new password using modern bcrypt
        $newHash = password_hash($password, PASSWORD_DEFAULT);

        // Update password in admin_users table
        executeQuery(
            $pdo,
            "UPDATE admin_users SET password_hash = ?, updated_at = NOW() WHERE email = ?",
            [$newHash, $resetRecord['email']]
        );

        // Mark token as used
        executeQuery(
            $pdo,
            "UPDATE password_resets SET used = 1 WHERE id = ?",
            [$resetRecord['id']]
        );

        sendJsonResponse([
            'success' => true,
            'message' => 'Password has been reset successfully! You can now log in.'
        ]);
    }

    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);

} catch (Exception $e) {
    error_log("Reset password error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to reset password. Please try again.'
    ], 500);
}
?>
