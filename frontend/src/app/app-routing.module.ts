import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from './auth/login/login.component';
import {QuestionComponent} from "./auth/question/question.component";
import {UserComponent} from "./auth/user/user.component";
import {AuthComponent} from "./auth/auth/auth.component";


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path : 'login', component: LoginComponent },
  { path : 'question', component: QuestionComponent},
  { path : 'users', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
