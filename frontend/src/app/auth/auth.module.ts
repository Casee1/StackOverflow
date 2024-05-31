import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { UserComponent} from "./user/user.component";
import { AuthComponent } from './auth/auth.component';
import {RouterModule} from "@angular/router";
import { FormsModule} from "@angular/forms";
import { AnswerComponent } from './answer/answer.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    QuestionComponent,
    AuthComponent,
    AnswerComponent,
    UserComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }
