-- ============================================
-- Donations Table
-- Stores all donation records with Razorpay integration
-- ============================================

CREATE TABLE IF NOT EXISTS donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Donor Information
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    donor_phone VARCHAR(20) DEFAULT NULL,
    donor_address TEXT DEFAULT NULL,
    
    -- Donation Details
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    donation_purpose VARCHAR(255) DEFAULT 'General Donation',
    message TEXT DEFAULT NULL,
    
    -- Razorpay Payment Details
    razorpay_order_id VARCHAR(100) DEFAULT NULL,
    razorpay_payment_id VARCHAR(100) DEFAULT NULL,
    razorpay_signature VARCHAR(255) DEFAULT NULL,
    
    -- Payment Status
    payment_status ENUM('pending', 'success', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50) DEFAULT NULL, -- card, netbanking, upi, wallet, etc.
    
    -- Receipt Information
    receipt_number VARCHAR(100) DEFAULT NULL,
    receipt_generated BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_completed_at TIMESTAMP NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Metadata
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    
    -- Indexes
    INDEX idx_donor_email (donor_email),
    INDEX idx_payment_status (payment_status),
    INDEX idx_razorpay_payment (razorpay_payment_id),
    INDEX idx_razorpay_order (razorpay_order_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Donation Stats View
-- Quick view for donation statistics
-- ============================================
CREATE OR REPLACE VIEW donation_stats AS
SELECT 
    COUNT(*) as total_donations,
    SUM(CASE WHEN payment_status = 'success' THEN 1 ELSE 0 END) as successful_donations,
    SUM(CASE WHEN payment_status = 'success' THEN amount ELSE 0 END) as total_amount_collected,
    AVG(CASE WHEN payment_status = 'success' THEN amount ELSE NULL END) as average_donation,
    MAX(CASE WHEN payment_status = 'success' THEN amount ELSE 0 END) as highest_donation,
    COUNT(DISTINCT donor_email) as unique_donors
FROM donations;

-- ============================================
-- Sample Test Data (Optional - Remove in production)
-- ============================================
-- INSERT INTO donations (donor_name, donor_email, donor_phone, amount, donation_purpose, payment_status) VALUES
-- ('John Doe', 'john@example.com', '9876543210', 5000.00, 'Infrastructure Development', 'success'),
-- ('Jane Smith', 'jane@example.com', '9876543211', 10000.00, 'Student Scholarship', 'success'),
-- ('Bob Johnson', 'bob@example.com', '9876543212', 2500.00, 'General Donation', 'success');
