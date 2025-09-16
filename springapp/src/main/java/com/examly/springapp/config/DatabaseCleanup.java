package com.examly.springapp.config;

import com.examly.springapp.repository.StudentExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(3)
public class DatabaseCleanup implements CommandLineRunner {

    @Autowired
    private StudentExamRepository studentExamRepository;

    @Override
    public void run(String... args) throws Exception {
        // Clean up IN_PROGRESS entries for shiva user
        studentExamRepository.findAll().forEach(se -> {
            if ("IN_PROGRESS".equals(se.getStatus()) && "shiva".equals(se.getStudentUsername())) {
                se.setStatus("COMPLETED");
                studentExamRepository.save(se);
                System.out.println("Cleaned up IN_PROGRESS entry for shiva: " + se.getStudentExamId());
            }
        });
    }
}