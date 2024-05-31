package com.example.stackoverflowbun.repository;

import com.example.stackoverflowbun.entity.Answer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AnswerRepository extends CrudRepository<Answer, Long> {

}
