<?php
/**
 * Razorpay Configuration
 * Reads credentials from environment variables on Render, falling back to test keys.
 */

define('RAZORPAY_KEY_ID', getenv('RAZORPAY_KEY_ID') ?: 'rzp_test_TgVF1zHuVFwoxx');
define('RAZORPAY_KEY_SECRET', getenv('RAZORPAY_KEY_SECRET') ?: 'nIAaXwz2xERx4kGjvZ2KRzJA');
define('RAZORPAY_WEBHOOK_SECRET', getenv('RAZORPAY_WEBHOOK_SECRET') ?: 'jmmt_webhook_secret_2026');

define('RAZORPAY_CURRENCY', 'INR');
define('RAZORPAY_NAME', 'JMMS School');
define('RAZORPAY_DESCRIPTION', 'Donation for John Martyn Memorial School');
define('RAZORPAY_LOGO', 'https://jmmt.org.in/wp-content/uploads/2022/07/jmms-logo-7-1-e1525669143761-1.webp');
define('RAZORPAY_THEME_COLOR', '#E8B923');

function getRazorpayCredentials() {
    return [
        'key_id' => RAZORPAY_KEY_ID,
        'key_secret' => RAZORPAY_KEY_SECRET,
        'currency' => RAZORPAY_CURRENCY,
        'name' => RAZORPAY_NAME,
        'description' => RAZORPAY_DESCRIPTION,
        'logo' => RAZORPAY_LOGO,
        'theme_color' => RAZORPAY_THEME_COLOR,
    ];
}

function verifyRazorpaySignature($razorpay_order_id, $razorpay_payment_id, $razorpay_signature) {
    if (empty($razorpay_order_id) || empty($razorpay_payment_id) || empty($razorpay_signature)) {
        return false;
    }
    $generated_signature = hash_hmac('sha256', $razorpay_order_id . "|" . $razorpay_payment_id, RAZORPAY_KEY_SECRET);
    return hash_equals($generated_signature, $razorpay_signature);
}

function verifyRazorpayWebhookSignature($payload, $signature) {
    if (empty($payload) || empty($signature)) {
        return false;
    }
    $expected_signature = hash_hmac('sha256', $payload, RAZORPAY_WEBHOOK_SECRET);
    return hash_equals($expected_signature, $signature);
}

function createRazorpayOrder($amount, $notes = []) {
    $url = 'https://api.razorpay.com/v1/orders';
    $amountInPaise = (int) round($amount * 100);
    
    $data = [
        'amount' => $amountInPaise,
        'currency' => RAZORPAY_CURRENCY,
        'receipt' => 'rcpt_' . time() . '_' . mt_rand(1000, 9999),
        'notes' => $notes
    ];
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curl_error = curl_error($ch);
    if (PHP_VERSION_ID < 80500 && is_resource($ch)) {
        curl_close($ch);
    }
    
    if ($http_code === 200) {
        return json_decode($response, true);
    }
    
    error_log("Razorpay Order Failed (HTTP $http_code): " . ($curl_error ?: $response));
    return false;
}

function fetchRazorpayPayment($payment_id) {
    if (empty($payment_id)) return false;
    
    $url = "https://api.razorpay.com/v1/payments/{$payment_id}";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if (PHP_VERSION_ID < 80500 && is_resource($ch)) {
        curl_close($ch);
    }
    
    if ($http_code === 200) {
        return json_decode($response, true);
    }
    return false;
}
?>
