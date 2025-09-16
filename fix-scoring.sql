-- Fix scoring issues by checking and updating correct answers
USE app_db;

-- First, let's see what's in the database
SELECT 'Current Questions:' as info;
SELECT q.question_id, q.question_text, q.correct_option, q.marks,
       q.option_a, q.option_b, q.option_c, q.option_d
FROM question q 
JOIN exam e ON q.exam_id = e.exam_id 
WHERE e.is_active = 1;

SELECT 'Current Student Answers:' as info;
SELECT sa.student_answer_id, sa.selected_option, sa.is_correct, sa.marks_earned,
       q.correct_option, q.question_text
FROM student_answer sa
JOIN question q ON sa.question_id = q.question_id
ORDER BY sa.student_answer_id DESC
LIMIT 10;

-- Update all student answers to be correct for testing
UPDATE student_answer sa
JOIN question q ON sa.question_id = q.question_id
SET sa.is_correct = 1, 
    sa.marks_earned = q.marks
WHERE sa.selected_option = q.correct_option;

-- Recalculate student exam scores
UPDATE student_exam se
SET se.score = (
    SELECT COALESCE(SUM(sa.marks_earned), 0)
    FROM student_answer sa
    WHERE sa.student_exam_id = se.student_exam_id
)
WHERE se.status = 'COMPLETED';

SELECT 'Updated Student Exam Scores:' as info;
SELECT se.student_exam_id, se.student_username, se.score, se.status
FROM student_exam se
WHERE se.status = 'COMPLETED';