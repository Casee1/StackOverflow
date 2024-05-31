import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AnswerModel } from "../models/answer.model";

@Injectable({ providedIn: 'root' })
export class AnswerService {

  private answerUrl = 'http://localhost:8080/answer';

  constructor(private http: HttpClient) { }

  getAnswers(questionId: number) {
    return this.http.get<AnswerModel[]>(`${this.answerUrl}/getByQuestionId?questionId=${questionId}`);
  }

  updateAnswer(answer: AnswerModel): Observable<AnswerModel> {
    return this.http.put<AnswerModel>(`${this.answerUrl}/updateAnswer`, answer);
  }

  deleteAnswer(id: number, userId: number): Observable<string> {
    return this.http.delete(`${this.answerUrl}/deleteAnswerById/${id}/${userId}`, { responseType: 'text' });
  }


  insertAnswer(text: string, questionId: number): Observable<AnswerModel> {
    const answer = { text, questionId };
    return this.http.post<AnswerModel>(`${this.answerUrl}/insertAnswer`, answer);
  }

  likeAnswer(answerId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.answerUrl}/likeAnswer/${answerId}`, userId);
  }

  dislikeAnswer(answerId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.answerUrl}/dislikeAnswer/${answerId}`, userId);
  }
}
