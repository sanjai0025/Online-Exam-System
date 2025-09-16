package com.examly.springapp.config;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Order(1)
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create test teacher if not exists
        if (!userRepository.existsByUsername("teacher")) {
            User teacher = new User();
            teacher.setUsername("teacher");
            teacher.setPassword("teacher");
            teacher.setEmail("teacher@test.com");
            teacher.setFullName("Test Teacher");
            teacher.setRole("TEACHER");
            teacher.setCreatedAt(LocalDateTime.now());
            userRepository.save(teacher);
            System.out.println("Created test teacher: username=teacher, password=teacher");
        }

        // Create test student if not exists
        if (!userRepository.existsByUsername("student")) {
            User student = new User();
            student.setUsername("student");
            student.setPassword("student");
            student.setEmail("student@test.com");
            student.setFullName("Test Student");
            student.setRole("STUDENT");
            student.setCreatedAt(LocalDateTime.now());
            userRepository.save(student);
            System.out.println("Created test student: username=student, password=student");
        }
    }
}