package com.example.stackoverflowbun.exception;

public class AnswerNotFoundException extends RuntimeException{

    public AnswerNotFoundException(String message){
        super(message);
    }
}
