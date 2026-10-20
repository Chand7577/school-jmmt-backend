-- ============================================
-- JMMS School - Complete Database Schema for Hostinger
-- Import this single file into Hostinger phpMyAdmin
-- ============================================

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Default Admin (Username: admin or admin@gmail.com | Password: admin)
INSERT INTO admin_users (email, password_hash, full_name) VALUES 
('admin@gmail.com', '$2y$12$ZfJgaa1ddk1/qWMp2aR09O8g0H0L.331b7/ouRuk7IpPlayiGX4mC', 'School Administrator')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location VARCHAR(255) DEFAULT 'JMMS Campus, Salangaon',
    event_type ENUM('academic', 'sports', 'cultural', 'meeting', 'holiday', 'other') DEFAULT 'other',
    status ENUM('active', 'cancelled', 'completed') DEFAULT 'active',
    max_participants INT DEFAULT NULL,
    current_participants INT DEFAULT 0,
    image_url VARCHAR(500) DEFAULT NULL,
    created_by INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_event_date (event_date),
    INDEX idx_event_type (event_type),
    INDEX idx_status (status),
    INDEX idx_created_by (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Initial Events
INSERT INTO events (title, description, event_date, start_time, end_time, location, event_type, status, max_participants, current_participants, created_by) VALUES 
('Annual Sports Day 2026', 'Inter-house athletic meets, marchpast, sprint races, and trophy distribution.', CURDATE() + INTERVAL 14 DAY, '09:00:00', '14:00:00', 'School Grounds, Salangaon', 'sports', 'active', 250, 45, 1),
('Science & Innovation Exhibition', 'Student project showcases, robotics models, and science fair competition.', CURDATE() + INTERVAL 28 DAY, '10:00:00', '15:30:00', 'School Auditorium', 'academic', 'active', 200, 30, 1),
('Independence Day Assembly', 'Flag hoisting ceremony, patriotic songs, and cultural performances by students.', CURDATE() + INTERVAL 60 DAY, '08:30:00', '11:30:00', 'Main Campus Courtyard', 'cultural', 'active', 300, 150, 1)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- 3. Donations Table
CREATE TABLE IF NOT EXISTS donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    donor_phone VARCHAR(20) DEFAULT NULL,
    donor_address TEXT DEFAULT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    donation_purpose VARCHAR(255) DEFAULT 'General Donation',
    message TEXT DEFAULT NULL,
    razorpay_order_id VARCHAR(100) DEFAULT NULL,
    razorpay_payment_id VARCHAR(100) DEFAULT NULL,
    razorpay_signature VARCHAR(255) DEFAULT NULL,
    payment_status ENUM('pending', 'success', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50) DEFAULT NULL,
    receipt_number VARCHAR(100) DEFAULT NULL,
    receipt_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_completed_at TIMESTAMP NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    INDEX idx_donor_email (donor_email),
    INDEX idx_payment_status (payment_status),
    INDEX idx_razorpay_payment (razorpay_payment_id),
    INDEX idx_razorpay_order (razorpay_order_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Donation Statistics View
CREATE OR REPLACE VIEW donation_stats AS
SELECT 
    COUNT(*) as total_donations,
    SUM(CASE WHEN payment_status = 'success' THEN 1 ELSE 0 END) as successful_donations,
    SUM(CASE WHEN payment_status = 'success' THEN amount ELSE 0 END) as total_amount_collected,
    AVG(CASE WHEN payment_status = 'success' THEN amount ELSE NULL END) as average_donation,
    MIN(CASE WHEN payment_status = 'success' THEN amount ELSE NULL END) as min_donation,
FROM donations;

-- 5. Password Resets Table (For Admin Forgot / Reset Password)
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(128) NOT NULL,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
