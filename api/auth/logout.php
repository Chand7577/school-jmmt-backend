<?php
/**
 * Authentication API - Logout Endpoint
 * 
 * POST /backend/api/auth/logout.php
 * Handles admin logout via API
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

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
    // Logout the user
    logoutAdmin();
    
    sendJsonResponse([
        'success' => true,
        'message' => 'Logout successful'
    ]);
    
} catch (Exception $e) {
    error_log("Logout API error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Logout failed. Please try again.'
    ], 500);
}
?>