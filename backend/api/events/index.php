<?php
/**
 * Events API - Main CRUD Endpoint
 * 
 * GET    /backend/api/events/         - Get all events
 * POST   /backend/api/events/         - Create new event
 * PUT    /backend/api/events/{id}     - Update event
 * DELETE /backend/api/events/{id}     - Delete event
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../includes/auth.php';

$currentAdmin = getCurrentAdmin();
$method = $_SERVER['REQUEST_METHOD'];

// Check authentication for mutating requests
if ($method !== 'GET' && !$currentAdmin) {
    sendJsonResponse(['success' => false, 'message' => 'Authentication required'], 401);
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pathParts = explode('/', trim($path, '/'));
$eventId = end($pathParts);

// If the last part is 'index.php' or not numeric, check query param 'id'
if ($eventId === 'index.php' || !is_numeric($eventId)) {
    $eventId = $_GET['id'] ?? null;
}
if ($eventId && is_numeric($eventId)) {
    $eventId = intval($eventId);
} else {
    $eventId = null;
}

try {
    $pdo = getDbConnection();
    
    switch ($method) {
        case 'GET':
            handleGetEvents($pdo, $eventId, $currentAdmin);
            break;
            
        case 'POST':
            handleCreateEvent($pdo, $currentAdmin['id']);
            break;
            
        case 'PUT':
            handleUpdateEvent($pdo, $eventId, $currentAdmin['id']);
            break;
            
        case 'DELETE':
            handleDeleteEvent($pdo, $eventId);
            break;
            
        default:
            sendJsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    error_log("Events API error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'API request failed. Please try again.'
    ], 500);
}

/**
 * Handle GET requests for events
 */
function handleGetEvents($pdo, $eventId, $currentAdmin = null) {
    try {
        if ($eventId) {
            // Get single event
            $sql = "SELECT e.*, a.full_name as created_by_name 
                    FROM events e 
                    LEFT JOIN admin_users a ON e.created_by = a.id 
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
        } else {
            // Get all events with optional filtering
            $where = '';
            $params = [];
            
            // Add filters based on query parameters
            if (isset($_GET['type']) && !empty($_GET['type']) && $_GET['type'] !== 'all') {
                $where .= ' WHERE e.event_type = ?';
                $params[] = $_GET['type'];
            }
            
            if (isset($_GET['status']) && !empty($_GET['status']) && $_GET['status'] !== 'all') {
                $where .= ($where ? ' AND' : ' WHERE') . ' e.status = ?';
                $params[] = $_GET['status'];
            } elseif (!$currentAdmin) {
                // Public visitors only see active events
                $where .= ($where ? ' AND' : ' WHERE') . " e.status = 'active'";
            }
            
            if (isset($_GET['upcoming']) && $_GET['upcoming'] === 'true') {
                $where .= ($where ? ' AND' : ' WHERE') . ' e.event_date >= CURDATE()';
            }
            
            // Order and limit
            $orderBy = ' ORDER BY e.event_date DESC, e.start_time ASC';
            $limit = '';
            
            if (isset($_GET['limit']) && is_numeric($_GET['limit'])) {
                $limit = ' LIMIT ' . intval($_GET['limit']);
            }
            
            $sql = "SELECT e.*, a.full_name as created_by_name 
                    FROM events e 
                    JOIN admin_users a ON e.created_by = a.id" 
                    . $where . $orderBy . $limit;
            
            $stmt = executeQuery($pdo, $sql, $params);
            $events = $stmt->fetchAll();
            
            sendJsonResponse([
                'success' => true,
                'data' => $events,
                'count' => count($events)
            ]);
        }
    } catch (Exception $e) {
        throw $e;
    }
}

/**
 * Handle POST requests to create new event
 */
function handleCreateEvent($pdo, $adminId) {
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid JSON input'], 400);
        }
        
        // Validate required fields
        $required = ['title', 'event_date'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                sendJsonResponse([
                    'success' => false,
                    'message' => "Field '$field' is required"
                ], 400);
            }
        }

        // Handle start_time and end_time with fallback defaults
        $startTime = !empty($input['start_time']) ? trim($input['start_time']) : '09:00:00';
        $endTime = !empty($input['end_time']) ? trim($input['end_time']) : (!empty($input['start_time']) ? trim($input['start_time']) : '17:00:00');

        if (preg_match('/^\d{2}:\d{2}$/', $startTime)) {
            $startTime .= ':00';
        }
        if (preg_match('/^\d{2}:\d{2}$/', $endTime)) {
            $endTime .= ':00';
        }
        
        // Sanitize and validate input
        $data = [
            'title' => sanitizeInput($input['title']),
            'description' => sanitizeInput($input['description'] ?? ''),
            'event_date' => $input['event_date'],
            'start_time' => $startTime,
            'end_time' => $endTime,
            'location' => sanitizeInput($input['location'] ?? ''),
            'event_type' => in_array($input['event_type'] ?? '', ['academic', 'sports', 'cultural', 'meeting', 'holiday', 'other']) 
                           ? $input['event_type'] : 'other',
            'status' => in_array($input['status'] ?? '', ['active', 'cancelled', 'completed']) 
                       ? $input['status'] : 'active',
            'max_participants' => is_numeric($input['max_participants'] ?? '') ? intval($input['max_participants']) : null,
            'current_participants' => is_numeric($input['current_participants'] ?? '') ? intval($input['current_participants']) : 0,
            'image_url' => sanitizeInput($input['image_url'] ?? ''),
            'created_by' => $adminId
        ];
        
        // Validate date and time
        if (!validateDate($data['event_date'])) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid event date format'], 400);
        }
        
        if (!validateTime($data['start_time']) || !validateTime($data['end_time'])) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid time format'], 400);
        }
        
        // Insert event
        $sql = "INSERT INTO events (title, description, event_date, start_time, end_time, location, 
                event_type, status, max_participants, current_participants, image_url, created_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $params = [
            $data['title'], $data['description'], $data['event_date'], 
            $data['start_time'], $data['end_time'], $data['location'],
            $data['event_type'], $data['status'], $data['max_participants'],
            $data['current_participants'], $data['image_url'], $data['created_by']
        ];
        
        executeQuery($pdo, $sql, $params);
        $eventId = $pdo->lastInsertId();
        
        // Get the created event
        $getEventSql = "SELECT e.*, a.full_name as created_by_name 
                        FROM events e 
                        JOIN admin_users a ON e.created_by = a.id 
                        WHERE e.id = ?";
        $stmt = executeQuery($pdo, $getEventSql, [$eventId]);
        $event = $stmt->fetch();
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Event created successfully',
            'data' => $event
        ], 201);
        
    } catch (Exception $e) {
        throw $e;
    }
}

/**
 * Handle PUT requests to update event
 */
function handleUpdateEvent($pdo, $eventId, $adminId) {
    if (!$eventId || !is_numeric($eventId)) {
        sendJsonResponse(['success' => false, 'message' => 'Valid event ID required'], 400);
    }
    
    try {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid JSON input'], 400);
        }
        
        // Check if event exists
        $checkSql = "SELECT id, created_by FROM events WHERE id = ?";
        $stmt = executeQuery($pdo, $checkSql, [$eventId]);
        $existingEvent = $stmt->fetch();
        
        if (!$existingEvent) {
            sendJsonResponse(['success' => false, 'message' => 'Event not found'], 404);
        }
        
        // Build update query dynamically
        $updateFields = [];
        $params = [];
        
        $allowedFields = [
            'title', 'description', 'event_date', 'start_time', 'end_time', 
            'location', 'event_type', 'status', 'max_participants', 'current_participants', 'image_url'
        ];
        
        foreach ($allowedFields as $field) {
            if (isset($input[$field])) {
                if (in_array($field, ['title', 'description', 'location', 'image_url'])) {
                    $updateFields[] = "$field = ?";
                    $params[] = sanitizeInput($input[$field]);
                } elseif ($field === 'event_type') {
                    if (in_array($input[$field], ['academic', 'sports', 'cultural', 'meeting', 'holiday', 'other'])) {
                        $updateFields[] = "$field = ?";
                        $params[] = $input[$field];
                    }
                } elseif ($field === 'status') {
                    if (in_array($input[$field], ['active', 'cancelled', 'completed'])) {
                        $updateFields[] = "$field = ?";
                        $params[] = $input[$field];
                    }
                } elseif (in_array($field, ['max_participants', 'current_participants'])) {
                    if (is_numeric($input[$field]) || $input[$field] === null) {
                        $updateFields[] = "$field = ?";
                        $params[] = $input[$field] === null ? null : intval($input[$field]);
                    }
                } else {
                    // event_date, start_time, end_time
                    $updateFields[] = "$field = ?";
                    $params[] = $input[$field];
                }
            }
        }
        
        if (empty($updateFields)) {
            sendJsonResponse(['success' => false, 'message' => 'No valid fields to update'], 400);
        }
        
        // Validate dates and times if provided
        if (isset($input['event_date']) && !validateDate($input['event_date'])) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid event date format'], 400);
        }
        
        if (isset($input['start_time']) && !validateTime($input['start_time'])) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid start time format'], 400);
        }
        
        if (isset($input['end_time']) && !validateTime($input['end_time'])) {
            sendJsonResponse(['success' => false, 'message' => 'Invalid end time format'], 400);
        }
        
        // Update event
        $sql = "UPDATE events SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $params[] = $eventId;
        
        executeQuery($pdo, $sql, $params);
        
        // Get updated event
        $getEventSql = "SELECT e.*, a.full_name as created_by_name 
                        FROM events e 
                        JOIN admin_users a ON e.created_by = a.id 
                        WHERE e.id = ?";
        $stmt = executeQuery($pdo, $getEventSql, [$eventId]);
        $event = $stmt->fetch();
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Event updated successfully',
            'data' => $event
        ]);
        
    } catch (Exception $e) {
        throw $e;
    }
}

/**
 * Handle DELETE requests to delete event
 */
function handleDeleteEvent($pdo, $eventId) {
    if (!$eventId || !is_numeric($eventId)) {
        sendJsonResponse(['success' => false, 'message' => 'Valid event ID required'], 400);
    }
    
    try {
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
        
    } catch (Exception $e) {
        throw $e;
    }
}

/**
 * Validate date format (YYYY-MM-DD)
 */
function validateDate($date) {
    $d = DateTime::createFromFormat('Y-m-d', $date);
    return $d && $d->format('Y-m-d') === $date;
}

/**
 * Validate time format (HH:MM:SS or HH:MM)
 */
function validateTime($time) {
    $patterns = ['/^\d{2}:\d{2}:\d{2}$/', '/^\d{2}:\d{2}$/'];
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $time)) {
            return true;
        }
    }
    return false;
}
?>