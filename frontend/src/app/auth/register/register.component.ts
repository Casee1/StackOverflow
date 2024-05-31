import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule} from '@angular/forms';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      console.log('Register button clicked');  // Log when the button is clicked

        this.submitted = true;

        // reset alerts on submit
        

        // stop here if form is invalid
        if (this.form.invalid) {
            console.log('Form is invalid');  // Log if form is invalid
            return;
        }

        this.loading = true;
        console.log('Attempting registration with:', this.form.value); // Log form data being submitted
        const username = this.form.value.username;
        const password = this.form.value.password;
        // this.userService.register(this.form.value)
        //     .pipe(first())
        //     .subscribe({
        //         next: () => {
        //             console.log("can we go");
        //             console.log(this.route.snapshot);
        //             this.router.navigate(['/login']);
        //         },
        this.userService.register(username, password).pipe(first()).subscribe({
            next: () => {
                console.log("Registration successful, navigating to login");
                this.router.navigate(['/login']);
            },
                error: error => {
                    console.error('Registration failed with error:', error);
                    this.loading = false;
                }
            });
    }
}