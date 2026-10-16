<?php
/**
 * Authentication API - Check Session Endpoint
 * 
 * GET /backend/api/auth/check.php
 * Checks if admin is logged in and returns user data
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../includes/auth.php';

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

try {
    if (isAdminLoggedIn()) {
        $currentAdmin = getCurrentAdmin();
        sendJsonResponse([
            'success' => true,
            'authenticated' => true,
            'data' => [
                'user' => $currentAdmin,
                'csrf_token' => getCSRFToken()
            ]
        ]);
    } else {
        sendJsonResponse([
            'success' => true,
            'authenticated' => false,
            'message' => 'Not authenticated'
        ]);
    }
    
} catch (Exception $e) {
    error_log("Auth check API error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Authentication check failed.'
    ], 500);
}
?>