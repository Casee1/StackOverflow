import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  currentUser: UserModel | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router

  ) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    } else {
      // Handle the case where there is no logged-in user
      console.error('No user is loggedin.');
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],  // Changed from email to username
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  get f() { return this.loginForm.controls; }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

      this.loading = true;
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.userService.findUserByUsername(username).subscribe({
        next: (user: any) => {
          if (user.ban === "BANNED") {
            console.error('Account is banned.');
            this.loading = false;
            return;
          }
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/question']);
        },
        error: (error: any) => {
          console.error('Login failed:', error);
          this.loading = false;
        }
      });
  }
}
