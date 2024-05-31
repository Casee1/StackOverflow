package com.example.stackoverflowbun.controller;

import com.example.stackoverflowbun.entity.User;
import com.example.stackoverflowbun.service.EmailService;
import com.example.stackoverflowbun.service.UserService;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    private EmailService emailService;

    private UserController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/getAllUsers")
    public List<User> listAllUsers(){
        return userService.listUsers();
    }

    @GetMapping("/getUserById")
    public User listUserById(@RequestParam("id") Long id){
        return userService.listUserById(id);
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }
    @GetMapping("/register/{username}/{password}")
    public User registerUser(@PathVariable String username, @PathVariable String password) {
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password); // You should hash the password before storing it
        return userService.registerUser(newUser);
    }

    @GetMapping("/getUserByUsername/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteUserById")
    public String deleteUserById(@RequestParam Long id){
        return userService.deleteUserById(id);
    }

    @PostMapping("/ban/{bannedId}")
    public ResponseEntity<?> banUser(@RequestBody Long userId, @PathVariable Long bannedId) {
        try {
            userService.banUser(userId, bannedId);
            emailService.sendEmail("casiancristian96@gmail.com", "User with the id:" + bannedId + " is banned", "User with the id:" + bannedId + " is banned");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error banning user: " + e.getMessage());
        }
    }

    @PostMapping("/unban/{bannedId}")
    public ResponseEntity<?> unbanUser(@RequestBody Long userId, @PathVariable Long bannedId) {
        try {
            userService.unbanUser(userId, bannedId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error unbanning user: " + e.getMessage());
        }
    }
}
