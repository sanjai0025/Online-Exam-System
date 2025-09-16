package com.examly.springapp.service;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.model.StudentExam;
import com.examly.springapp.repository.ExamRepository;
import com.examly.springapp.repository.QuestionRepository;
import com.examly.springapp.repository.StudentExamRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private StudentExamRepository studentExamRepository;

    public Exam createExam(Exam exam) {
        exam.setCreatedAt(LocalDateTime.now());
        exam.setIsActive(false);
        return examRepository.save(exam);
    }

    public Question addQuestion(Long examId, Question question) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));
        question.setExam(exam);
        return questionRepository.save(question);
    }

    public List<Exam> getExamsByTeacher(String teacherUsername) {
        return examRepository.findByCreatedBy(teacherUsername);
    }

    public Exam setExamActiveStatus(Long examId, boolean isActive) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));
        exam.setIsActive(isActive);
        return examRepository.save(exam);
    }

    public List<Exam> getActiveExams() {
        return examRepository.findByIsActiveTrue();
    }

    public Exam getExamById(Long examId) {
        return examRepository.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));
    }

    public List<Map<String, Object>> getExamResults(Long examId) {
        System.out.println("ExamService: Looking for results for exam ID: " + examId);
        List<StudentExam> studentExams = studentExamRepository.findByExamExamId(examId);
        System.out.println("ExamService: Found " + studentExams.size() + " student exams");
        
        List<Map<String, Object>> results = new ArrayList<>();
        for (StudentExam studentExam : studentExams) {
            System.out.println("Processing student exam: " + studentExam.getStudentUsername() + ", status: " + studentExam.getStatus());
            Map<String, Object> result = new HashMap<>();
            result.put("studentExamId", studentExam.getStudentExamId());
            result.put("studentUsername", studentExam.getStudentUsername());
            result.put("score", studentExam.getScore() != null ? studentExam.getScore() : 0);
            result.put("status", studentExam.getStatus());
            result.put("startTime", studentExam.getStartTime());
            result.put("endTime", studentExam.getEndTime());
            results.add(result);
        }
        
        return results;
    }
    
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
    
    public List<Question> getQuestionsByTeacher(String teacherUsername) {
        return questionRepository.findByExamCreatedBy(teacherUsername);
    }
}
