<?php
/**
 * Authentication and Session Management
 * 
 * This file contains functions for handling admin authentication,
 * session management, and security features.
 */

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Authenticate admin user with email and password
 * @param string $email
 * @param string $password
 * @return array Result with success status and user data
 */
function authenticateAdmin($email, $password) {
    try {
        $pdo = getDbConnection();
        
        $sql = "SELECT id, email, password_hash, full_name, is_active 
                FROM admin_users 
                WHERE email = ? AND is_active = TRUE";
        
        $stmt = executeQuery($pdo, $sql, [$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password_hash'])) {
            // Update last login time
            $updateSql = "UPDATE admin_users SET last_login = NOW() WHERE id = ?";
            executeQuery($pdo, $updateSql, [$user['id']]);
            
            // Set session variables
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_email'] = $user['email'];
            $_SESSION['admin_name'] = $user['full_name'];
            $_SESSION['login_time'] = time();
            $_SESSION['csrf_token'] = generateCSRFToken();
            
            return [
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'name' => $user['full_name']
                ]
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Invalid email or password'
            ];
        }
    } catch (Exception $e) {
        error_log("Authentication error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Authentication failed. Please try again.'
        ];
    }
}

/**
 * Check if admin is logged in
 * @return bool
 */
function isAdminLoggedIn() {
    return isset($_SESSION['admin_id']) && 
           isset($_SESSION['admin_email']) && 
           isset($_SESSION['login_time']) &&
           (time() - $_SESSION['login_time']) < (24 * 60 * 60); // 24 hours session
}

/**
 * Get current admin user data
 * @return array|null
 */
function getCurrentAdmin() {
    if (isAdminLoggedIn()) {
        return [
            'id' => $_SESSION['admin_id'],
            'email' => $_SESSION['admin_email'],
            'name' => $_SESSION['admin_name']
        ];
    }
    return null;
}

/**
 * Logout admin user
 */
function logoutAdmin() {
    // Clear all session variables
    $_SESSION = array();
    
    // Destroy the session cookie
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 42000, '/');
    }
    
    // Destroy the session
    session_destroy();
}

/**
 * Require admin authentication - redirect to login if not authenticated
 */
function requireAdminAuth() {
    if (!isAdminLoggedIn()) {
        header('Location: /school-dashboard/backend/login.php');
        exit();
    }
}

/**
 * Generate CSRF token
 * @return string
 */
function generateCSRFToken() {
    return bin2hex(random_bytes(32));
}

/**
 * Verify CSRF token
 * @param string $token
 * @return bool
 */
function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && 
           hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Get CSRF token for forms
 * @return string
 */
function getCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = generateCSRFToken();
    }
    return $_SESSION['csrf_token'];
}

/**
 * Hash password securely
 * @param string $password
 * @return string
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

/**
 * Sanitize input data
 * @param mixed $data
 * @return mixed
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Send JSON response
 * @param array $data
 * @param int $httpCode
 */
function sendJsonResponse($data, $httpCode = 200) {
    http_response_code($httpCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}
?>