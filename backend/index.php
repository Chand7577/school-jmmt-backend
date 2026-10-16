<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'service' => 'JMMS School Backend API',
    'status' => 'online',
    'version' => '1.0.0',
    'time' => date('Y-m-d H:i:s'),
    'endpoints' => [
        'POST /api/donations/create-order.php',
        'POST /api/donations/verify-payment.php',
        'POST /api/donations/razorpay-webhook.php'
    ]
]);
?>
