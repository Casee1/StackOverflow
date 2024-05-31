package com.example.stackoverflowbun.repository;

import com.example.stackoverflowbun.entity.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Long> {
    List<Question> findByTagsContaining(String tags);
    List<Question> findByTitleContaining(String title);
    List<Question> findByUserUsername(String username);
}
