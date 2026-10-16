<?php
/**
 * Razorpay Webhook Handler
 * Endpoint: POST /api/donations/razorpay-webhook.php
 * 
 * Listens for events from Razorpay servers:
 * - payment.captured / order.paid: Marks donation as success even if user closed browser
 * - payment.failed: Logs failure reason in database
 */

header('Content-Type: application/json');

require_once '../../config/database.php';
require_once '../../config/razorpay.php';

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit();
}

$payload = file_get_contents('php://input');
$signature = isset($_SERVER['HTTP_X_RAZORPAY_SIGNATURE']) ? $_SERVER['HTTP_X_RAZORPAY_SIGNATURE'] : '';

if (empty($payload) || empty($signature)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing payload or signature']);
    exit();
}

// Verify webhook signature
if (!verifyRazorpayWebhookSignature($payload, $signature)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid webhook signature']);
    exit();
}

$data = json_decode($payload, true);
$event = isset($data['event']) ? $data['event'] : '';

try {
    $pdo = getDbConnection();

    switch ($event) {
        case 'payment.captured':
        case 'order.paid':
            $paymentEntity = isset($data['payload']['payment']['entity']) ? $data['payload']['payment']['entity'] : null;
            if ($paymentEntity) {
                $orderId = $paymentEntity['order_id'];
                $paymentId = $paymentEntity['id'];
                $method = isset($paymentEntity['method']) ? $paymentEntity['method'] : 'online';

                $sql = "UPDATE donations 
                        SET payment_status = 'success', 
                            razorpay_payment_id = ?, 
                            payment_method = ?, 
                            payment_completed_at = NOW() 
                        WHERE razorpay_order_id = ? AND payment_status != 'success'";
                executeQuery($pdo, $sql, [$paymentId, $method, $orderId]);
            }
            break;

        case 'payment.failed':
            $paymentEntity = isset($data['payload']['payment']['entity']) ? $data['payload']['payment']['entity'] : null;
            if ($paymentEntity) {
                $orderId = $paymentEntity['order_id'];
                $paymentId = $paymentEntity['id'];
                $errorDesc = isset($paymentEntity['error_description']) ? $paymentEntity['error_description'] : 'Payment failed';

                $sql = "UPDATE donations 
                        SET payment_status = 'failed', 
                            razorpay_payment_id = ?, 
                            message = CONCAT(IFNULL(message, ''), ' [Failure Reason: ', ?, ']')
                        WHERE razorpay_order_id = ?";
                executeQuery($pdo, $sql, [$paymentId, $errorDesc, $orderId]);
            }
            break;

        default:
            // Unhandled event, log and acknowledge
            break;
    }

    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Webhook processed successfully']);

} catch (Exception $e) {
    error_log("Webhook Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
