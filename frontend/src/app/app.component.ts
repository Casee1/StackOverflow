import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'StackOverflow';

  register() {
    // Implement your register logic here
    console.log('Register clicked');
  }

  login() {
    // Implement your login logic here
    console.log('Log in clicked');
  }

}
