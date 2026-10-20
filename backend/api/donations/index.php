<?php
/**
 * Donations API - Admin Dashboard List & Stats Endpoint
 * 
 * GET /backend/api/donations/ - List donations & summary statistics
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../../config/database.php';
require_once '../../includes/auth.php';

// Authentication required to view donor financial data
if (!isAdminLoggedIn()) {
    sendJsonResponse(['success' => false, 'message' => 'Authentication required'], 401);
}

try {
    $pdo = getDbConnection();

    // 1. Fetch Stats
    $statsSql = "SELECT 
        COUNT(*) as total_count,
        COALESCE(SUM(CASE WHEN payment_status = 'success' THEN 1 ELSE 0 END), 0) as success_count,
        COALESCE(SUM(CASE WHEN payment_status = 'pending' THEN 1 ELSE 0 END), 0) as pending_count,
        COALESCE(SUM(CASE WHEN payment_status = 'failed' THEN 1 ELSE 0 END), 0) as failed_count,
        COALESCE(SUM(CASE WHEN payment_status = 'success' THEN amount ELSE 0 END), 0) as total_collected,
        COALESCE(AVG(CASE WHEN payment_status = 'success' THEN amount ELSE NULL END), 0) as average_donation
        FROM donations";
    
    $statsStmt = executeQuery($pdo, $statsSql);
    $stats = $statsStmt->fetch() ?: [
        'total_count' => 0,
        'success_count' => 0,
        'pending_count' => 0,
        'failed_count' => 0,
        'total_collected' => 0,
        'average_donation' => 0
    ];

    // 2. Fetch Donations with filters
    $where = [];
    $params = [];

    if (!empty($_GET['status']) && $_GET['status'] !== 'all') {
        $where[] = "payment_status = ?";
        $params[] = sanitizeInput($_GET['status']);
    }

    if (!empty($_GET['search'])) {
        $searchTerm = '%' . sanitizeInput($_GET['search']) . '%';
        $where[] = "(donor_name LIKE ? OR donor_email LIKE ? OR donor_phone LIKE ? OR receipt_number LIKE ?)";
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
        $params[] = $searchTerm;
    }

    $whereClause = count($where) > 0 ? " WHERE " . implode(" AND ", $where) : "";
    $orderClause = " ORDER BY created_at DESC";

    $limit = 100;
    if (!empty($_GET['limit']) && is_numeric($_GET['limit'])) {
        $limit = min(500, max(1, intval($_GET['limit'])));
    }

    $sql = "SELECT id, donor_name, donor_email, donor_phone, amount, currency, donation_purpose, 
                   message, razorpay_order_id, razorpay_payment_id, payment_status, payment_method, 
                   receipt_number, created_at, payment_completed_at
            FROM donations" . $whereClause . $orderClause . " LIMIT " . $limit;

    $stmt = executeQuery($pdo, $sql, $params);
    $donations = $stmt->fetchAll();

    sendJsonResponse([
        'success' => true,
        'data' => [
            'stats' => [
                'total_donations' => intval($stats['total_count']),
                'success_count' => intval($stats['success_count']),
                'pending_count' => intval($stats['pending_count']),
                'failed_count' => intval($stats['failed_count']),
                'total_collected' => floatval($stats['total_collected']),
                'average_donation' => round(floatval($stats['average_donation']), 2)
            ],
            'donations' => $donations
        ]
    ]);

} catch (Exception $e) {
    error_log("Donations API error: " . $e->getMessage());
    sendJsonResponse([
        'success' => false,
        'message' => 'Failed to fetch donations: ' . $e->getMessage()
    ], 500);
}
