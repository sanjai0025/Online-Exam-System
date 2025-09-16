package com.examly.springapp.config;

import com.examly.springapp.model.Exam;
import com.examly.springapp.model.Question;
import com.examly.springapp.repository.ExamRepository;
import com.examly.springapp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Order(2)
public class TestDataInitializer implements CommandLineRunner {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create test exam if not exists
        if (examRepository.count() == 0) {
            Exam testExam = new Exam();
            testExam.setTitle("Sample Math Test");
            testExam.setDescription("A basic mathematics test for students");
            testExam.setDuration(30);
            testExam.setIsActive(true);
            testExam.setCreatedBy("teacher");
            testExam.setCreatedAt(LocalDateTime.now());
            testExam = examRepository.save(testExam);
            System.out.println("Created test exam: " + testExam.getTitle());

            // Create test questions
            Question q1 = new Question();
            q1.setExam(testExam);
            q1.setQuestionText("What is 2 + 2?");
            q1.setOptionA("3");
            q1.setOptionB("4");
            q1.setOptionC("5");
            q1.setOptionD("6");
            q1.setCorrectOption("B");
            q1.setMarks(2);

            questionRepository.save(q1);

            Question q2 = new Question();
            q2.setExam(testExam);
            q2.setQuestionText("What is 5 * 3?");
            q2.setOptionA("15");
            q2.setOptionB("12");
            q2.setOptionC("18");
            q2.setOptionD("20");
            q2.setCorrectOption("A");
            q2.setMarks(2);

            questionRepository.save(q2);

            System.out.println("Created 2 test questions for exam");
        }
    }
}