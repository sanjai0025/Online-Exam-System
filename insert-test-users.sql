-- Insert test users for login testing
USE app_db;

-- Clear existing users first
DELETE FROM users;

-- Insert test users
INSERT INTO users (username, email, full_name, password, role, created_at) VALUES
('teacher1', 'teacher@test.com', 'Test Teacher', 'password123', 'TEACHER', NOW()),
('student1', 'student@test.com', 'Test Student', 'password123', 'STUDENT', NOW()),
('admin', 'admin@test.com', 'Admin User', 'admin123', 'TEACHER', NOW());

-- Verify users were inserted
SELECT * FROM users;