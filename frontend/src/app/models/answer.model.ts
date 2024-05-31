import {QuestionModel} from "./question.model";
import {UserModel} from "./user.model";

export interface AnswerModel {
  answer_id: number;
  user: UserModel; // Assuming UserModel is defined elsewhere
  question_id: number; // Change to question_id
  text: string;
  time: string; // Adjust as needed
  date: string; // Adjust as needed
  image: string; // Assuming the image is represented as a string URL
  likes: number;
  dislikes: number;
}
