<?php
/**
 * Create Razorpay Order API
 * 
 * POST /backend/api/donations/create-order.php
 * Creates a Razorpay order for donation
 */

// Send CORS headers FIRST before any other output
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 3600');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

require_once '../../config/database.php';
require_once '../../config/razorpay.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
        exit();
    }
    
    // Validate required fields
    $required = ['donor_name', 'donor_email', 'amount'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => "Field '{$field}' is required"
            ]);
            exit();
        }
    }
    
    // Sanitize and validate input
    $donor_name = trim($input['donor_name']);
    $donor_email = filter_var(trim($input['donor_email']), FILTER_VALIDATE_EMAIL);
    $donor_phone = isset($input['donor_phone']) ? trim($input['donor_phone']) : null;
    $amount = floatval($input['amount']);
    $donation_purpose = isset($input['donation_purpose']) ? trim($input['donation_purpose']) : 'General Donation';
    $message = isset($input['message']) ? trim($input['message']) : null;
    
    // Validate email
    if (!$donor_email) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit();
    }
    
    // Validate amount (minimum ₹10)
    if ($amount < 10) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Minimum donation amount is ₹10']);
        exit();
    }
    
    // Create Razorpay order
    $notes = [
        'donor_name' => $donor_name,
        'donor_email' => $donor_email,
        'donation_purpose' => $donation_purpose
    ];
    
    $razorpay_order = createRazorpayOrder($amount, $notes);
    
    if (!$razorpay_order) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to create payment order. Please try again.'
        ]);
        exit();
    }
    
    // Store donation record in database
    $pdo = getDbConnection();
    
    $sql = "INSERT INTO donations (
        donor_name, donor_email, donor_phone, amount, currency, 
        donation_purpose, message, razorpay_order_id, payment_status, 
        ip_address, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)";
    
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? null;
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? null;
    
    $stmt = executeQuery($pdo, $sql, [
        $donor_name,
        $donor_email,
        $donor_phone,
        $amount,
        RAZORPAY_CURRENCY,
        $donation_purpose,
        $message,
        $razorpay_order['id'],
        $ip_address,
        $user_agent
    ]);
    
    $donation_id = $pdo->lastInsertId();
    
    // Get Razorpay credentials for frontend
    $credentials = getRazorpayCredentials();
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Order created successfully',
        'data' => [
            'donation_id' => $donation_id,
            'order_id' => $razorpay_order['id'],
            'amount' => $amount,
            'currency' => RAZORPAY_CURRENCY,
            'razorpay_key' => $credentials['key_id'],
            'razorpay_config' => [
                'key' => $credentials['key_id'],
                'amount' => $razorpay_order['amount'], // Amount in paise
                'currency' => RAZORPAY_CURRENCY,
                'name' => $credentials['name'],
                'description' => $donation_purpose,
                'image' => $credentials['logo'],
                'order_id' => $razorpay_order['id'],
                'theme' => [
                    'color' => $credentials['theme_color']
                ],
                'prefill' => [
                    'name' => $donor_name,
                    'email' => $donor_email,
                    'contact' => $donor_phone
                ]
            ]
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Create Order API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to create order. Please try again.'
    ]);
}
?>
