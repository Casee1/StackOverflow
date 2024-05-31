package com.example.stackoverflowbun.service;

import com.example.stackoverflowbun.entity.Answer;
import com.example.stackoverflowbun.entity.User;
import com.example.stackoverflowbun.exception.AnswerNotFoundException;
import com.example.stackoverflowbun.exception.QuestionNotFoundException;
import com.example.stackoverflowbun.exception.UserNotFoundException;
import com.example.stackoverflowbun.repository.AnswerRepository;
import com.example.stackoverflowbun.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Answer> listAnswers() {
        return (List<Answer>) answerRepository.findAll();
    }

    public Answer getAnswerById(Long id) {
        return answerRepository.findById(id).orElseThrow(() -> new RuntimeException("Answer not found"));
    }

    public Answer listAnswerById(Long id) {
        return answerRepository.findById(id).orElse(null);
    }

    public Answer insertAnswer(Answer answer) {
        return answerRepository.save(answer);
    }


    public Answer updateAnswer(Answer answer) {
        if(this.answerRepository.findById(answer.getAnswer_id()).orElse(null) == null) {
            return null;
        }
        return answerRepository.save(answer);
    }

    public String deleteAnswerById(Long id, Long userId) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new AnswerNotFoundException("Answer not found with id: " + id));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        if(answer.getUser().getUser_id().equals(userId) || user.getRole().equals("MODERATOR")) {
            try {
                answerRepository.deleteById(id);
                return "Deletion successful!";
            } catch (Exception e) {
                return "Cannot delete the answer with id " + id;
            }
        } else {
            throw new IllegalArgumentException("Users cannot delete their own answer");
        }

    }

    public List<Answer> getByQuestionId(Long questionId){
        return ((List<Answer>) this.answerRepository.findAll())
                .stream()
                .filter(answer -> answer.getQuestion().getQuestion_id() == questionId).toList();
    }

    public void dislikeAnswer(Long id, Long userId) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new AnswerNotFoundException("Answer not found with id: " + id));

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        if(!answer.getUser().getUser_id().equals(userId)) {
            answer.setDislikes(answer.getDislikes() + 1);
            answerRepository.save(answer);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Users cannot dislike their own answer");
        }

    }

    public void likeAnswer(Long id, Long userId) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new AnswerNotFoundException("Answer not found with id: " + id));

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        if(!answer.getUser().getUser_id().equals(userId)) {
            answer.setLikes(answer.getLikes() + 1);
            answerRepository.save(answer);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Users cannot like their own answer");
        }
    }
}
