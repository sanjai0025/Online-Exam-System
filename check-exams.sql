-- Check if there are any exams in the database
USE app_db;

-- Show all exams
SELECT * FROM exam;

-- Show active exams only
SELECT * FROM exam WHERE is_active = 1;

-- Show questions for exams
SELECT e.title, q.question_text FROM exam e 
LEFT JOIN question q ON e.exam_id = q.exam_id;