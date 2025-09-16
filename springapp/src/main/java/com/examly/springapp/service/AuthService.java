package com.examly.springapp.service;



import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public Map<String, Object> register(User user) {
        Map<String, Object> response = new HashMap<>();
        
        // Validate input
        if (user == null) {
            response.put("success", false);
            response.put("message", "User data is required");
            return response;
        }
        
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username is required");
            return response;
        }
        
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Email is required");
            return response;
        }
        
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password is required");
            return response;
        }
        
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Role is required");
            return response;
        }
        
        // Check if username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return response;
        }

        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            response.put("success", false);
            response.put("message", "Email already exists");
            return response;
        }

        // Validate role
        if (!user.getRole().equals("TEACHER") && !user.getRole().equals("STUDENT")) {
            response.put("success", false);
            response.put("message", "Role must be either TEACHER or STUDENT");
            return response;
        }

        // Save user (WARNING: This stores plaintext passwords - CRITICAL security vulnerability!)
        // TODO: Implement BCrypt password hashing before production use
        user.setCreatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);

        response.put("success", true);
        response.put("message", "User registered successfully");
        response.put("user", Map.of(
            "userId", savedUser.getUserId(),
            "username", savedUser.getUsername(),
            "email", savedUser.getEmail(),
            "fullName", savedUser.getFullName(),
            "role", savedUser.getRole()
        ));
        
        return response;
    }

    public Map<String, Object> login(String username, String password) {
        Map<String, Object> response = new HashMap<>();
        
        if (username == null || username.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username is required");
            return response;
        }
        
        if (password == null || password.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password is required");
            return response;
        }
        
        Optional<User> userOpt = userRepository.findByUsername(username);
        
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
            return response;
        }

        User user = userOpt.get();
        
        // WARNING: Plain text password comparison - CRITICAL security vulnerability!
        // TODO: Implement BCrypt password hashing for production use
        if (!user.getPassword().equals(password)) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
            return response;
        }

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("user", Map.of(
            "userId", user.getUserId(),
            "username", user.getUsername(),
            "email", user.getEmail(),
            "fullName", user.getFullName(),
            "role", user.getRole()
        ));
        
        return response;
    }
}
