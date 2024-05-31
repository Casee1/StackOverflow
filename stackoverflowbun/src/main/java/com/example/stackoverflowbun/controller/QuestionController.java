package com.example.stackoverflowbun.controller;

import com.example.stackoverflowbun.entity.Answer;
import com.example.stackoverflowbun.entity.Question;
import com.example.stackoverflowbun.entity.User;
import com.example.stackoverflowbun.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.sql.Time;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @ResponseBody
    @GetMapping("/getQuestions")
    public List<Question> getAllQuestions(
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String text,
            @RequestParam(required = false) String user) {
        return questionService.getFilteredQuestions(tag, text, user);
    }

    @GetMapping("/{id}")
    public String getQuestionById(@PathVariable Long id, Model model, Principal principal) {
        Optional<Question> optionalQuestion = questionService.listQuestionById(id);

        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            Answer answer = new Answer();
            answer.setQuestion_id(question.getQuestion_id()); // Set the question ID
            model.addAttribute("question", question);
            model.addAttribute("answer", answer);
            return "questionView"; // Name of the view to be returned
        } else {
            // Handle the case when the question is not found
            model.addAttribute("error", "Question not found with id: " + id);
            return "errorView"; // Name of the error view to be returned
        }
    }

    @PostMapping("/dislikeQuestion/{questionId}")
    public ResponseEntity<Void> dislikeQuestion(@PathVariable Long questionId, @RequestBody Long userId) {
        User user = questionService.getQuestionById(questionId).getUser();
        user.setScore(user.getScore() - 1.5);
        questionService.dislikeQuestion(questionId, userId);

        return ResponseEntity.ok().build();
    }


    @PostMapping("/likeQuestion/{questionId}")
    public ResponseEntity<Void> likeQuestion(@PathVariable Long questionId, @RequestBody Long userId) {
        User user = questionService.getQuestionById(questionId).getUser();
        user.setScore(user.getScore() + 2.5);
        questionService.likeQuestion(questionId, userId);
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PostMapping("/insertQuestion")
    public ResponseEntity<Question> insertQuestion(@RequestBody Question question) {
        Question savedQuestion = questionService.insertQuestion(question);
        return ResponseEntity.ok(savedQuestion);
    }


    @ResponseBody
    @PutMapping("/updateQuestion/{userId}")
    public Question updateQuestion(@RequestBody Question question, @PathVariable Long userId) {
        return questionService.updateQuestion(question, userId);
    }

    @ResponseBody
    @DeleteMapping("/deleteQuestionById/{id}/{userId}")
    public ResponseEntity<String> deleteQuestionById(@PathVariable Long id, @PathVariable Long userId) {
        questionService.deleteQuestionById(id, userId);
        return ResponseEntity.ok("Question deleted successfully");
    }


}
