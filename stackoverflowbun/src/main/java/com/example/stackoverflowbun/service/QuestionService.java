package com.example.stackoverflowbun.service;

import com.example.stackoverflowbun.entity.Question;
import com.example.stackoverflowbun.entity.User;
import com.example.stackoverflowbun.exception.QuestionNotFoundException;
import com.example.stackoverflowbun.exception.UnauthorizedException;
import com.example.stackoverflowbun.exception.UserNotFoundException;
import com.example.stackoverflowbun.repository.QuestionRepository;
import com.example.stackoverflowbun.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Question> getFilteredQuestions(String tag, String text, String user) {
        if (tag != null && !tag.isEmpty()) {
            return questionRepository.findByTagsContaining(tag);
        } else if (text != null && !text.isEmpty()) {
            return questionRepository.findByTitleContaining(text);
        } else if (user != null && !user.isEmpty()) {
            return questionRepository.findByUserUsername(user);
        } else {
            return (List<Question>) questionRepository.findAll();
        }
    }

    @Transactional(readOnly = true)
    public Optional<Question> listQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    public void dislikeQuestion(Long questionId, Long userId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new QuestionNotFoundException("Question not found with id: " + questionId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        if (!question.getUser().getUser_id().equals(userId)) {
            question.setDislikes(question.getDislikes() + 1);
            questionRepository.save(question);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Users cannot dislike their own question.");
        }
    }


    public void likeQuestion(Long id, Long userId) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException("Question not found with id: " + id));

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        if (!question.getUser().getUser_id().equals(userId)) {
            question.setLikes(question.getLikes() + 1);

            questionRepository.save(question);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Users cannot dislike their own question");
        }

        questionRepository.save(question);
    }

    public Question insertQuestion(Question question) {
        return questionRepository.save(question);
    }


    public Question updateQuestion(Question question, Long userId) {
        Question existingQuestion = questionRepository.findById(question.getQuestion_id())
                .orElseThrow(() -> new QuestionNotFoundException("Question not found with id: " + question.getQuestion_id()));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        if(existingQuestion == null) {
            return null;
        }
        if(existingQuestion.getUser().getUser_id().equals(userId) || user.getRole().equals("MODERATOR")) {
            existingQuestion.setTitle(question.getTitle());
            existingQuestion.setText(question.getText());
            existingQuestion.setTags(question.getTags());
            return questionRepository.save(existingQuestion);

        } else {
            throw new UnauthorizedException("You are not authorized to update this question");
        }

    }

    public String deleteQuestionById(Long id, Long userId) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException("Question not found with id: " + id));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        if (question.getUser().getUser_id().equals(userId) || user.getRole().equals("MODERATOR")) {
            try {
                questionRepository.deleteById(id);
                return "Deletion successful!";
            } catch (Exception e) {
                return "Cannot delete the question with id " + id;
            }
        } else {
            throw new IllegalArgumentException("Users cannot delete their own question");
        }

    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
    }

}
