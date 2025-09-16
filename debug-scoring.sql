-- Debug scoring issues
USE app_db;

-- Check questions and their correct answers
SELECT q.question_id, q.question_text, q.correct_option, q.marks 
FROM question q 
JOIN exam e ON q.exam_id = e.exam_id 
WHERE e.is_active = 1;

-- Check student answers
SELECT sa.student_answer_id, sa.selected_option, sa.is_correct, sa.marks_earned,
       q.correct_option, q.marks as question_marks
FROM student_answer sa
JOIN question q ON sa.question_id = q.question_id
ORDER BY sa.student_answer_id DESC
LIMIT 10;

-- Check student exam scores
SELECT se.student_exam_id, se.student_username, se.score, se.status,
       e.title as exam_title
FROM student_exam se
JOIN exam e ON se.exam_id = e.exam_id
ORDER BY se.student_exam_id DESC
LIMIT 5;