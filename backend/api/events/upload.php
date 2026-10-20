<?php
/**
 * Event Image Upload Endpoint
 * 
 * POST /backend/api/events/upload.php
 * Handles image file upload for events and saves to /uploads/events/
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

// Require admin authentication
if (!isAdminLoggedIn()) {
    sendJsonResponse(['success' => false, 'message' => 'Authentication required to upload files'], 401);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

try {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        $errorCode = $_FILES['image']['error'] ?? 'No file provided';
        sendJsonResponse(['success' => false, 'message' => 'File upload error: ' . $errorCode], 400);
    }

    $file = $_FILES['image'];

    // 1. Validate file size (max 12MB)
    $maxSize = 12 * 1024 * 1024;
    if ($file['size'] > $maxSize) {
        sendJsonResponse(['success' => false, 'message' => 'File too large. Maximum size allowed is 12MB.'], 400);
    }

    // 2. Validate MIME type
    $allowedTypes = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
        'image/gif' => 'gif'
    ];

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!array_key_exists($mimeType, $allowedTypes)) {
        sendJsonResponse(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG, WebP, and GIF images are allowed.'], 400);
    }

    $ext = $allowedTypes[$mimeType];

    // 3. Define target upload directory
    // uploads/events/ relative to public root
    $uploadDir = dirname(dirname(__DIR__)) . '/uploads/events';
    if (!file_exists($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            sendJsonResponse(['success' => false, 'message' => 'Failed to create upload directory on server.'], 500);
        }
    }

    // 4. Generate unique, clean filename
    $safeBasename = 'event_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $targetPath = $uploadDir . '/' . $safeBasename;

    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        sendJsonResponse(['success' => false, 'message' => 'Failed to move uploaded file.'], 500);
    }

    // 5. Return accessible relative URL
    $publicUrl = '/uploads/events/' . $safeBasename;

    sendJsonResponse([
        'success' => true,
        'message' => 'Image uploaded successfully',
        'url' => $publicUrl
    ]);

} catch (Exception $e) {
    error_log("Image upload error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Upload failed: ' . $e->getMessage()
    ], 500);
}
