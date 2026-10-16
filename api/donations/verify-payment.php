<?php
/**
 * Verify Razorpay Payment API
 * 
 * POST /backend/api/donations/verify-payment.php
 * Verifies and updates payment status after successful payment
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
    $required = ['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature'];
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
    
    $razorpay_order_id = $input['razorpay_order_id'];
    $razorpay_payment_id = $input['razorpay_payment_id'];
    $razorpay_signature = $input['razorpay_signature'];
    
    // Verify signature
    $is_valid = verifyRazorpaySignature($razorpay_order_id, $razorpay_payment_id, $razorpay_signature);
    
    if (!$is_valid) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Payment verification failed. Invalid signature.'
        ]);
        exit();
    }
    
    // Fetch payment details from Razorpay (optional metadata)
    $payment_details = fetchRazorpayPayment($razorpay_payment_id);
    $payment_method = ($payment_details && isset($payment_details['method'])) ? $payment_details['method'] : 'online';
    
    // Update donation record in database
    $pdo = getDbConnection();
    
    // Get donation record by order ID
    $sql = "SELECT * FROM donations WHERE razorpay_order_id = ? LIMIT 1";
    $stmt = executeQuery($pdo, $sql, [$razorpay_order_id]);
    $donation = $stmt->fetch();
    
    // If donation already successfully verified, return idempotent response
    if ($donation && $donation['payment_status'] === 'success') {
        echo json_encode([
            'success' => true,
            'message' => 'Payment already verified successfully',
            'data' => [
                'donation_id' => $donation['id'],
                'receipt_number' => $donation['receipt_number'],
                'amount' => $donation['amount'],
                'payment_id' => $donation['razorpay_payment_id'] ?: $razorpay_payment_id,
                'payment_method' => $donation['payment_method'] ?: $payment_method,
                'status' => 'success'
            ]
        ]);
        exit();
    }
    
    $donation_id = null;
    $amount = 0;
    $receipt_number = null;
    
    if ($donation) {
        $donation_id = $donation['id'];
        $amount = $donation['amount'];
        $receipt_number = $donation['receipt_number'] ?: ('JMMS-' . date('Y') . '-' . str_pad($donation_id, 6, '0', STR_PAD_LEFT));
        
        // Update donation with payment details
        $update_sql = "UPDATE donations SET 
            razorpay_payment_id = ?,
            razorpay_signature = ?,
            payment_status = 'success',
            payment_method = ?,
            payment_completed_at = NOW(),
            receipt_number = ?,
            receipt_generated = 1
            WHERE id = ?";
        
        executeQuery($pdo, $update_sql, [
            $razorpay_payment_id,
            $razorpay_signature,
            $payment_method,
            $receipt_number,
            $donation_id
        ]);
    } else {
        // Fallback: If donation was not pre-saved, record it directly since signature is valid
        $donor_name = trim($input['donor_name'] ?? 'Generous Donor');
        $donor_email = trim($input['donor_email'] ?? 'donor@example.com');
        $donor_phone = trim($input['donor_phone'] ?? '');
        $amount = floatval($input['amount'] ?? 0);
        $currency = RAZORPAY_CURRENCY;
        $donation_purpose = 'General Donation';
        
        $insert_sql = "INSERT INTO donations (
            donor_name, donor_email, donor_phone, amount, currency,
            donation_purpose, razorpay_order_id, razorpay_payment_id,
            razorpay_signature, payment_status, payment_method,
            payment_completed_at, receipt_generated
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'success', ?, NOW(), 1)";
        
        executeQuery($pdo, $insert_sql, [
            $donor_name,
            $donor_email,
            $donor_phone,
            $amount,
            $currency,
            $donation_purpose,
            $razorpay_order_id,
            $razorpay_payment_id,
            $razorpay_signature,
            $payment_method
        ]);
        
        $donation_id = $pdo->lastInsertId();
        $receipt_number = 'JMMS-' . date('Y') . '-' . str_pad($donation_id, 6, '0', STR_PAD_LEFT);
        
        executeQuery($pdo, "UPDATE donations SET receipt_number = ? WHERE id = ?", [$receipt_number, $donation_id]);
    }
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Payment verified successfully',
        'data' => [
            'donation_id' => $donation_id,
            'receipt_number' => $receipt_number,
            'amount' => $amount,
            'payment_id' => $razorpay_payment_id,
            'payment_method' => $payment_method,
            'status' => 'success'
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Verify Payment API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Payment verification failed. Please contact support.'
    ]);
}
?>
