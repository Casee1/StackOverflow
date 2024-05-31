import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from "../../services/question.service";
import { QuestionModel } from "../../models/question.model";
import { AnswerService } from "../../services/answer.service";
import { AnswerModel } from "../../models/answer.model";
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questions: QuestionModel[] = [];
  answersMap: { [key: number]: AnswerModel[] } = {};
  user: UserModel[] = [];
  addQuestionForm: FormGroup;
  addAnswerForm: FormGroup;
  filterForm: FormGroup;
  isEditing: boolean = false;
  isEditingAnswer: boolean = false;
  currentUser: UserModel | null = null;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addQuestionForm = this.fb.group({
      question_id: [''],
      title: ['', Validators.required],
      text: ['', Validators.required],
      tags: ['']
    });

    this.addAnswerForm = this.fb.group({
      answer_id: [''],
      text: ['', Validators.required]
    });

    this.filterForm = this.fb.group({
      filterTag: [''],
      filterText: [''],
      filterUser: ['']
    });

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    } else {
      // Handle the case where there is no logged-in user
      console.error('No user is loggedin.');
    }
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      questions => {
        this.questions = questions;
        this.questions.forEach(question => {
          this.loadAnswersForQuestion(question.question_id);
        });
      },
      error => console.log('Error loading questions:', error)
    );
  }

  loadUsers(): void {
    // Implement show users logic
    this.router.navigate(['/users']);
    // You can add logic here to display a list of users or any other functionality you want to implement
  }

  loadAnswersForQuestion(questionId: number): void {
    this.answerService.getAnswers(questionId).subscribe(
      answers => {
        // Assuming the answers returned are for the specified question
        this.answersMap[questionId] = answers;
      },
      error => console.error(`Error loading answers for question ${questionId}:`, error)
    );
  }

  likeQuestion(questionId: number): void {
    if (this.currentUser) {
      this.questionService.likeQuestion(questionId, this.currentUser.user_id).subscribe(() => {
        const question = this.questions.find(q => q.question_id === questionId);
        if (question) {
          question.likes++;
        }
      });
    } else {
      console.error("You must be logged in");
    }

  }

  dislikeQuestion(questionId: number): void {
    if (this.currentUser) {
      this.questionService.dislikeQuestion(questionId, this.currentUser.user_id).subscribe(() => {
        const question = this.questions.find(q => q.question_id === questionId);
        if (question) {
          question.dislikes++;
        }
      });
    } else {
      console.error("You must be logged in");
    }

  }

  likeAnswer(answerId: number): void {
    if(this.currentUser) {
      this.answerService.likeAnswer(answerId, this.currentUser.user_id).subscribe(() => {
        for (const questionId in this.answersMap) {
          const answer = this.answersMap[questionId].find(a => a.answer_id === answerId);
          if (answer) {
            answer.likes++;
          }
        }
      });
    } else {
      console.error("You must be logged in");
    }

  }

  dislikeAnswer(answerId: number): void {
    if(this.currentUser) {
      this.answerService.dislikeAnswer(answerId, this.currentUser.user_id).subscribe(() => {
        for (const questionId in this.answersMap) {
          const answer = this.answersMap[questionId].find(a => a.answer_id === answerId);
          if (answer) {
            answer.dislikes++;
          }
        }
      });
    } else {
      console.error("You must be logged in");
    }

  }



  addNewQuestion(): void {
    if (this.addQuestionForm.valid) {
      const title = this.addQuestionForm.get('title')?.value;
      const text = this.addQuestionForm.get('text')?.value;
      const tags = this.addQuestionForm.get('tags')?.value || '';

      this.questionService.insertQuestion(title, text, tags).subscribe({
        next: (question) => {
          this.questions.push(question);
          this.addQuestionForm.reset();
        },
        error: (error) => console.error('Failed to add question:', error)
      });
    }
  }

  submitFormAnswer(questionId: number): void {
    if (this.isEditingAnswer) {
      this.updateAnswer();
    } else {
      this.addNewAnswer(questionId);
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.addQuestionForm.reset();
  }
  addNewAnswer(questionId: number): void {
    if (this.addAnswerForm.valid) {
      const text = this.addAnswerForm.get('text')?.value;

      this.answerService.insertAnswer(text, questionId).subscribe({
        next: (answer) => {
          if (!this.answersMap[questionId]) {
            this.answersMap[questionId] = [];
          }
          this.answersMap[questionId].push(answer);
          this.addAnswerForm.reset();
        },
        error: (error) => console.error('Failed to add answer', error)
      });
    }
  }





  editQuestion(question: QuestionModel): void {
    this.isEditing = true;
    this.addQuestionForm.patchValue({
      question_id: question.question_id,
      title: question.title,
      text: question.text,
      tags: question.tags
    });
  }

  editAnswer(answer: AnswerModel): void {
    this.isEditingAnswer = true;
    this.addAnswerForm.patchValue({
      answer_id: answer.answer_id,
      text: answer.text
    });
  }

  cancelEditAnswer(): void {
    this.isEditingAnswer = false;
    this.addAnswerForm.reset();
  }

  submitForm(): void {
    if (this.isEditing) {
      this.updateQuestion();
    } else {
      this.addNewQuestion();
    }
  }

  updateQuestion(): void {
    if(this.currentUser) {
      if (this.addQuestionForm.valid) {
        const updatedQuestion: QuestionModel = this.addQuestionForm.value;
        this.questionService.updateQuestion(updatedQuestion, this.currentUser.user_id).subscribe({
          next: (question) => {
            const index = this.questions.findIndex(q => q.question_id === question.question_id);

            if (index !== -1 && this.questions[index]) {
              this.questions[index] = question;
            }
            this.addQuestionForm.reset();
            this.isEditing = false;
          },
          error: (error) => console.error('Failed to update question:', error)
        });
      }
    } else {
      console.error("You must be logged in");
    }

  }


  updateAnswer(): void {
    if (this.addAnswerForm.valid) {
      const updatedAnswer: AnswerModel = this.addAnswerForm.value;
      const questionId = updatedAnswer.question_id;

      this.answerService.updateAnswer(updatedAnswer).subscribe({
        next: (answer) => {
          if (this.answersMap[questionId]) {
            const index = this.answersMap[questionId].findIndex(a => a.answer_id === answer.answer_id);
            if (index !== -1 && this.answersMap[questionId][index]) {
              this.answersMap[questionId][index] = answer;
            }
          }
          this.addAnswerForm.reset();
          this.isEditingAnswer = false;
        },
        error: (error) => console.error('Failed to update answer:', error)
      });
    }
  }

  filterQuestions(): void {
    const tag = this.filterForm.get('filterTag')?.value;
    const text = this.filterForm.get('filterText')?.value;
    const user = this.filterForm.get('filterUser')?.value;

    this.questionService.getQuestions(tag, text, user).subscribe(
      questions => this.questions = questions,
      error => console.error('Error filtering questions:', error)
    );
  }

  deleteQuestion(id: number): void {
    if (this.currentUser) {
      this.questionService.deleteQuestion(id, this.currentUser.user_id).subscribe({
        next: () => {
          this.questions = this.questions.filter(q => q.question_id != id);
        },
        error: (error) => console.error('Failed to delete question:', error)
      });
    } else {
      console.error("You must be logged in");
    }

  }

  deleteAnswer(id: number): void {
    if (this.currentUser) {
      this.answerService.deleteAnswer(id, this.currentUser.user_id).subscribe({
        next: () => {
          for (const questionId in this.answersMap) {
            this.answersMap[questionId] = this.answersMap[questionId].filter(a => a.answer_id !== id);
          }
        },
        error: (error) => console.error('Failed to delete answer:', error)
      });
    } else {
      console.error("You must to be logged in");
    }

  }

}
