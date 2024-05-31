package com.example.stackoverflowbun.entity;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "answer")
public class Answer {
    @Id
    @Column(name = "answer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answer_id;

    @JoinColumn(name = "author")
    @ManyToOne
    private User user;

    @JoinColumn(name = "questions")
    @ManyToOne
    private Question question;

    @Column(name = "question_id") // Changed to hold the question ID
    private Long question_id;

    @Column(name = "text")
    private String text;

    @Column(name = "time")
    private Time time;

    @Column(name = "date")
    private Date date;

    @Column(name = "image")
    private byte[] image;

    @Column(name = "dislikes")
    private Integer dislikes;

    @Column(name = "likes")
    private Integer likes;

    public Answer() {

    }

    public Answer(Long answer_id, User user, Question question, Long question_id, String text, Time time, Date date, byte[] image) {
        this.answer_id = answer_id;
        this.user = user;
        this.question = question;
        this.question_id = question_id;
        this.text = text;
        this.time = time;
        this.date = date;
        this.image = image;
    }

    public Long getAnswer_id() {
        return answer_id;
    }

    public void setAnswer_id(Long answer_id) {
        this.answer_id = answer_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Long getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Long question_id) {
        this.question_id = question_id;
    }

    public Integer getDislikes() {
        return dislikes;
    }

    public void setDislikes(Integer dislikes) {
        this.dislikes = dislikes;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }
}