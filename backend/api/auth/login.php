<?php
/**
 * Authentication API - Login Endpoint
 * 
 * POST /backend/api/auth/login.php
 * Handles admin login via API
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../includes/auth.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid JSON input'], 400);
    }
    
    $email = sanitizeInput($input['email'] ?? $input['username'] ?? '');
    $password = $input['password'] ?? '';
    
    // Validate input
    if (empty($email) || empty($password)) {
        sendJsonResponse([
            'success' => false,
            'message' => 'Username/email and password are required'
        ], 400);
    }
    
    // Authenticate user
    $result = authenticateAdmin($email, $password);
    
    if ($result['success']) {
        sendJsonResponse([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'token' => $result['token'],
                'user' => $result['user'],
                'csrf_token' => getCSRFToken()
            ]
        ]);
    } else {
        sendJsonResponse([
            'success' => false,
            'message' => $result['message']
        ], 401);
    }
    
} catch (Exception $e) {
    error_log("Login API error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Login failed. Please try again.'
    ], 500);
}
?>