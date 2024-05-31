import {UserModel} from "./user.model";
import {AnswerModel} from "./answer.model";

export interface QuestionModel {
  question_id : number,
  user : UserModel,
  title: string,
  text: string,
  date: Date,
  time: Date,
  image: string,
  tags: string,
  likes: number,
  dislikes: number;

}
