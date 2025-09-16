-- Database setup for Online Exam System
-- Run this script in MySQL to create the database

CREATE DATABASE IF NOT EXISTS app_db;
USE app_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT IGNORE INTO users (username, email, full_name, password, role) VALUES
('teacher1', 'teacher@example.com', 'Test Teacher', 'password123', 'TEACHER'),
('student1', 'student@example.com', 'Test Student', 'password123', 'STUDENT');

-- Show tables to verify
SHOW TABLES;
SELECT * FROM users;