package com.examly.springapp.controller;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.StudentAnswer;
import com.examly.springapp.service.ExamService;
import com.examly.springapp.service.StudentExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/student/exams")
public class StudentController {

    @Autowired
    private StudentExamService studentExamService;
    
    @Autowired
    private ExamService examService;

    @GetMapping
    public ResponseEntity<List<Exam>> getAvailableExams() {
        try {
            List<Exam> exams = examService.getActiveExams();
            return ResponseEntity.ok(exams);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/{examId}/start")
    public ResponseEntity<?> startExam(@PathVariable Long examId, @RequestBody Map<String, String> request) {
        try {
            System.out.println("DEBUG: Starting exam - ExamId: " + examId + ", Request: " + request);
            String studentUsername = request.get("studentUsername");
            System.out.println("DEBUG: Student username: " + studentUsername);
            
            Map<String, Object> response = studentExamService.startExam(examId, studentUsername);
            System.out.println("DEBUG: Exam started successfully - Response: " + response);
            
            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            System.err.println("ERROR: Failed to start exam - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{studentExamId}/answers")
    public ResponseEntity<?> submitAnswer(@PathVariable Long studentExamId, @RequestBody Map<String, Object> request) {
        try {
            System.out.println("DEBUG: Received answer submission - StudentExamId: " + studentExamId + ", Request: " + request);
            
            Long questionId = Long.valueOf(request.get("questionId").toString());
            String selectedOption = request.get("selectedOption").toString();
            
            System.out.println("DEBUG: Parsed - QuestionId: " + questionId + ", SelectedOption: " + selectedOption);
            
            StudentAnswer answer = studentExamService.submitAnswer(studentExamId, questionId, selectedOption);
            
            System.out.println("DEBUG: Answer saved successfully - AnswerId: " + answer.getAnswerId());
            
            return ResponseEntity.status(201).body(answer);
        } catch (Exception e) {
            System.err.println("ERROR: Failed to submit answer - " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{studentExamId}/complete")
    public ResponseEntity<?> completeExam(@PathVariable Long studentExamId) {
        Map<String, Object> response = studentExamService.completeExam(studentExamId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{studentExamId}/results")
    public ResponseEntity<?> getResults(@PathVariable Long studentExamId) {
        Map<String, Object> response = studentExamService.getResults(studentExamId);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/completed/{studentUsername}")
    public ResponseEntity<?> getCompletedExams(@PathVariable String studentUsername) {
        try {
            List<Map<String, Object>> completedExams = studentExamService.getCompletedExams(studentUsername);
            return ResponseEntity.ok(completedExams);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
