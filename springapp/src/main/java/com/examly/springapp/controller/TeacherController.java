package com.examly.springapp.controller;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private ExamService examService;

    // POST /api/teacher/exams - Create exam
    @PostMapping("/exams")
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        try {
            Exam created = examService.createExam(exam);
            return ResponseEntity.status(201).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // POST /api/teacher/exams/{examId}/questions - Add question
    @PostMapping("/exams/{examId}/questions")
    public ResponseEntity<Question> addQuestion(@PathVariable Long examId, @RequestBody Question question) {
        try {
            Question added = examService.addQuestion(examId, question);
            return ResponseEntity.status(201).body(added);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // GET /api/teacher/exams?createdBy=teacherUsername - Get exams by teacher
    @GetMapping("/exams")
    public ResponseEntity<List<Exam>> getExamsByTeacher(@RequestParam String createdBy) {
        try {
            List<Exam> exams = examService.getExamsByTeacher(createdBy);
            return ResponseEntity.ok(exams);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // PATCH /api/teacher/exams/{examId}/status - Activate/deactivate exam
    @PatchMapping("/exams/{examId}/status")
    public ResponseEntity<Exam> setExamActiveStatus(@PathVariable Long examId, @RequestBody Map<String, Boolean> body) {
        try {
            boolean isActive = Boolean.TRUE.equals(body.get("isActive"));
            Exam updatedExam = examService.setExamActiveStatus(examId, isActive);
            return ResponseEntity.ok(updatedExam);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // GET /api/teacher/exams/{examId} - Get exam by ID
    @GetMapping("/exams/{examId}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long examId) {
        try {
            Exam exam = examService.getExamById(examId);
            return ResponseEntity.ok(exam);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
    
    // GET /api/teacher/exams/{examId}/results - Get exam results
    @GetMapping("/exams/{examId}/results")
    public ResponseEntity<List<Map<String, Object>>> getExamResults(@PathVariable Long examId) {
        try {
            System.out.println("Getting results for exam ID: " + examId);
            List<Map<String, Object>> results = examService.getExamResults(examId);
            System.out.println("Found " + results.size() + " results");
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            System.err.println("Error getting exam results: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
    
    // GET /api/teacher/questions?createdBy=username - Get questions (all or by teacher)
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions(@RequestParam(required = false) String createdBy) {
        try {
            List<Question> questions = createdBy != null ? 
                examService.getQuestionsByTeacher(createdBy) : 
                examService.getAllQuestions();
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
