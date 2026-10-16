-- ============================================
-- School Admin Dashboard Database Schema
-- ============================================

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS school_admin;
USE school_admin;

-- ============================================
-- Admin Users Table
-- ============================================
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
);

-- ============================================
-- Events Table
-- ============================================
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location VARCHAR(255),
    event_type ENUM('academic', 'sports', 'cultural', 'meeting', 'holiday', 'other') DEFAULT 'other',
    status ENUM('active', 'cancelled', 'completed') DEFAULT 'active',
    max_participants INT DEFAULT NULL,
    current_participants INT DEFAULT 0,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES admin_users(id) ON DELETE CASCADE,
    INDEX idx_event_date (event_date),
    INDEX idx_event_type (event_type),
    INDEX idx_status (status),
    INDEX idx_created_by (created_by)
);

-- ============================================
-- Insert Default Admin User
-- ============================================
-- Password: admin (hashed using PHP password_hash with default algorithm)
INSERT INTO admin_users (email, password_hash, full_name) VALUES 
('admin@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'School Administrator');

-- ============================================
-- Insert Sample Events Data
-- ============================================
INSERT INTO events (
    title, 
    description, 
    event_date, 
    start_time, 
    end_time, 
    location, 
    event_type, 
    status, 
    max_participants, 
    current_participants,
    created_by
) VALUES 
(
    'Annual Science Fair',
    'Students will showcase their science projects and experiments. Open to all grades with prizes for top 3 projects in each category.',
    '2024-01-15',
    '09:00:00',
    '15:00:00',
    'Main Auditorium',
    'academic',
    'active',
    200,
    45,
    1
),
(
    'Inter-House Basketball Tournament',
    'Annual basketball championship between all four houses. Matches will be held throughout the week.',
    '2024-01-20',
    '14:00:00',
    '17:00:00',
    'Sports Complex',
    'sports',
    'active',
    100,
    80,
    1
),
(
    'Cultural Evening - Winter Showcase',
    'Students will perform dance, music, and drama presentations celebrating winter traditions from around the world.',
    '2024-01-25',
    '18:00:00',
    '21:00:00',
    'School Theater',
    'cultural',
    'active',
    300,
    120,
    1
),
(
    'Parent-Teacher Conference',
    'Quarterly meeting between parents and teachers to discuss student progress and development.',
    '2024-01-30',
    '10:00:00',
    '16:00:00',
    'Classroom Block A',
    'meeting',
    'active',
    NULL,
    0,
    1
),
(
    'Winter Break',
    'School holiday for winter break. Classes will resume on February 5th.',
    '2024-02-01',
    '00:00:00',
    '23:59:00',
    'N/A',
    'holiday',
    'active',
    NULL,
    0,
    1
),
(
    'Mathematics Olympiad Preparation Workshop',
    'Special workshop to prepare students for the upcoming Mathematics Olympiad competition.',
    '2024-02-10',
    '13:00:00',
    '15:30:00',
    'Computer Lab',
    'academic',
    'active',
    30,
    25,
    1
),
(
    'Annual Day Rehearsal',
    'Final rehearsal for the annual day performance. All participants must attend.',
    '2024-02-15',
    '15:00:00',
    '18:00:00',
    'Main Auditorium',
    'cultural',
    'active',
    150,
    140,
    1
),
(
    'Staff Development Workshop',
    'Professional development session for teaching staff on modern educational techniques.',
    '2024-02-20',
    '09:00:00',
    '12:00:00',
    'Conference Room',
    'meeting',
    'active',
    25,
    22,
    1
);

-- ============================================
-- Create Views for Better Data Access
-- ============================================

-- View for upcoming events
CREATE VIEW upcoming_events AS
SELECT 
    e.*,
    a.full_name as created_by_name
FROM events e
JOIN admin_users a ON e.created_by = a.id
WHERE e.event_date >= CURDATE() AND e.status = 'active'
ORDER BY e.event_date ASC, e.start_time ASC;

-- View for events summary
CREATE VIEW events_summary AS
SELECT 
    event_type,
    COUNT(*) as total_events,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_events,
    COUNT(CASE WHEN event_date >= CURDATE() THEN 1 END) as upcoming_events
FROM events
GROUP BY event_type;

-- ============================================
-- Database Information
-- ============================================
-- Default admin credentials:
-- Email: admin@gmail.com
-- Password: admin
-- 
-- Note: The password is hashed using PHP's password_hash() function
-- Use password_verify() in PHP to check passwords
-- ============================================