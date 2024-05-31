import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { QuestionModel } from "../models/question.model";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly questionUrl = 'http://localhost:8080/question';
  private readonly answerUrl = 'http://localhost:8080/answer';


  constructor(private http: HttpClient) { }

  getQuestions(tag?: string, text?: string, user?: string): Observable<QuestionModel[]> {
    let params = new HttpParams();
    if (tag) params = params.append('tag', tag);
    if (text) params = params.append('text', text);
    if (user) params = params.append('user', user);
    return this.http.get<QuestionModel[]>(`${this.questionUrl}/getQuestions`, { params });
  }

  insertQuestion(title: string, text: string, tags: string): Observable<QuestionModel> {
    const question = { title, text, tags };
    return this.http.post<QuestionModel>(`${this.questionUrl}/insertQuestion`, question);
  }

  updateQuestion(question: QuestionModel, userId: number): Observable<QuestionModel> {
    return this.http.put<QuestionModel>(`${this.questionUrl}/updateQuestion/${userId}`, question);
  }

  deleteQuestion(id: number, userId: number): Observable<string> {
    return this.http.delete(`${this.questionUrl}/deleteQuestionById/${id}/${userId}`, { responseType: 'text' });
  }

  likeQuestion(questionId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.questionUrl}/likeQuestion/${questionId}`, userId);
  }

  dislikeQuestion(questionId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.questionUrl}/dislikeQuestion/${questionId}`, userId);
  }



}
