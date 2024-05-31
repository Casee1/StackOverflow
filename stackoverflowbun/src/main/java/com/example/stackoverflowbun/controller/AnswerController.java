package com.example.stackoverflowbun.controller;

import com.example.stackoverflowbun.entity.Answer;
import com.example.stackoverflowbun.entity.User;
import com.example.stackoverflowbun.service.AnswerService;
import com.example.stackoverflowbun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/answer")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @Autowired
    private UserService userService;

    @ResponseBody
    @GetMapping("/getAllAnswers")
    public List<Answer> listAllAnswers() {
        return answerService.listAnswers();
    }


    @ResponseBody
    @PostMapping("/insertAnswer")
    public ResponseEntity<Answer> insertAnswer(@RequestBody Answer answer) {
        Answer savedAnswer = answerService.insertAnswer(answer);
        return ResponseEntity.ok(savedAnswer);

    }

    @ResponseBody
    @PutMapping("/updateAnswer")
    public Answer updateAnswer(@RequestBody Answer answer) {
        return answerService.updateAnswer(answer);
    }

    @ResponseBody
    @DeleteMapping("/deleteAnswerById/{id}/{userId}")
    public ResponseEntity<String> deleteAnswerById(@PathVariable Long id, @PathVariable Long userId) {
        answerService.deleteAnswerById(id, userId);
        return ResponseEntity.ok("Answer deleted successfully");
    }

    @ResponseBody
    @GetMapping("/getByQuestionId")
    public List<Answer> getByQuestionId(@RequestParam("questionId") Long questionId) {
        return answerService.getByQuestionId(questionId);
    }

    @PostMapping("/dislikeAnswer/{answerId}")
    public ResponseEntity<Void> dislikeQuestion(@PathVariable Long answerId, @RequestBody Long userId) {
        User user = answerService.getAnswerById(answerId).getUser();
        user.setScore(user.getScore() - 2.5);
        answerService.dislikeAnswer(answerId, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/likeAnswer/{answerId}")
    public ResponseEntity<Void> likeAnswer(@PathVariable Long answerId, @RequestBody Long userId) {
        User user = answerService.getAnswerById(answerId).getUser();
        user.setScore(user.getScore() + 5.0);

        answerService.likeAnswer(answerId, userId);
        return ResponseEntity.ok().build();
    }


}
