<?php
/**
 * Individual Event API Handler
 * 
 * GET    /backend/api/events/event.php?id={id}    - Get single event
 * PUT    /backend/api/events/event.php?id={id}    - Update event
 * DELETE /backend/api/events/event.php?id={id}    - Delete event
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../includes/auth.php';

// Check authentication
if (!isAdminLoggedIn()) {
    sendJsonResponse(['success' => false, 'message' => 'Authentication required'], 401);
}

$currentAdmin = getCurrentAdmin();
$method = $_SERVER['REQUEST_METHOD'];
$eventId = $_GET['id'] ?? null;

if (!$eventId || !is_numeric($eventId)) {
    sendJsonResponse(['success' => false, 'message' => 'Valid event ID required'], 400);
}

try {
    $pdo = getDbConnection();
    
    switch ($method) {
        case 'GET':
            getSingleEvent($pdo, $eventId);
            break;
            
        case 'PUT':
            updateEvent($pdo, $eventId, $currentAdmin['id']);
            break;
            
        case 'DELETE':
            deleteEvent($pdo, $eventId);
            break;
            
        default:
            sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    error_log("Event API error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'API request failed. Please try again.'
    ], 500);
}

function getSingleEvent($pdo, $eventId) {
    $sql = "SELECT e.*, a.full_name as created_by_name 
            FROM events e 
            JOIN admin_users a ON e.created_by = a.id 
            WHERE e.id = ?";
    $stmt = executeQuery($pdo, $sql, [$eventId]);
    $event = $stmt->fetch();
    
    if ($event) {
        sendJsonResponse([
            'success' => true,
            'data' => $event
        ]);
    } else {
        sendJsonResponse([
            'success' => false,
            'message' => 'Event not found'
        ], 404);
    }
}

function updateEvent($pdo, $eventId, $adminId) {
    // Reuse the update logic from index.php
    include 'index.php';
}

function deleteEvent($pdo, $eventId) {
    // Check if event exists
    $checkSql = "SELECT id, title FROM events WHERE id = ?";
    $stmt = executeQuery($pdo, $checkSql, [$eventId]);
    $event = $stmt->fetch();
    
    if (!$event) {
        sendJsonResponse(['success' => false, 'message' => 'Event not found'], 404);
    }
    
    // Delete event
    $deleteSql = "DELETE FROM events WHERE id = ?";
    executeQuery($pdo, $deleteSql, [$eventId]);
    
    sendJsonResponse([
        'success' => true,
        'message' => "Event '{$event['title']}' deleted successfully"
    ]);
}
?>