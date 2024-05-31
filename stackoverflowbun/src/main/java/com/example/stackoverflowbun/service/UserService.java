package com.example.stackoverflowbun.service;

import com.example.stackoverflowbun.entity.User;
import com.example.stackoverflowbun.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Add PasswordEncoder

    public List<User> listUsers(){
        return (List<User>) userRepository.findAll();
    }

    public User listUserById(Long id){
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }


    public User registerUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt the password
        return userRepository.save(user);
    }

    public String deleteUserById(Long id){
        try {
            userRepository.deleteById(id);
            return "Deletion successful";
        } catch (Exception e) {
            return "Failed to delete the user with id " + id;
        }
    }

    public void banUser(Long adminId, Long userId) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole().equals("MODERATOR")) {
            user.setBan("BANNED");
            userRepository.save(user);
        } else {
            throw new RuntimeException("Only moderators can ban users");
        }
    }

    public void unbanUser(Long adminId, Long userId) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (admin.getRole().equals("MODERATOR")) {
            user.setBan("UNBANNED");
            userRepository.save(user);
        } else {
            throw new RuntimeException("Only moderators can unban users");
        }
    }
    
}
