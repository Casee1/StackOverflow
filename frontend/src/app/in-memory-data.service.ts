import { Injectable } from '@angular/core';
import { UserModel } from "./models/user.model";
import {InMemoryDbService} from "angular-in-memory-web-api";
import {QuestionModel} from "./models/question.model";
import {AnswerModel} from "./models/answer.model";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb()  {
    const users: UserModel[] = [
      {
        user_id: 1,
        last_name: "Doe",
        first_name: "John",
        city: "New York",
        country: "USA",
        email: "johndoe@example.com",
        password: "password123",
        number: "1234567890"
      },
      {
        user_id: 2,
        last_name: "Smith",
        first_name: "Alice",
        city: "Los Angeles",
        country: "USA",
        email: "alice@example.com",
        password: "alicepassword",
        number: "9876543210"
      },
      {
        user_id: 3,
        last_name: "Brown",
        first_name: "Emily",
        city: "London",
        country: "UK",
        email: "emily@example.com",
        password: "emilypassword",
        number: "444555666"
      }
    ];

    const questions: QuestionModel[] = [
      {
        question_id: 1,
        user: {
          user_id: 1,
          last_name: "Doe",
          first_name: "John",
          city: "New York",
          country: "USA",
          email: "johndoe@example.com",
          password: "password123",
          number: "1234567890"
        },
        title: "How to improve JavaScript performance?",
        text: "I'm looking for tips on improving JavaScript performance in web applications.",
        date: new Date(),
        time: new Date(),
        image: new Uint8Array(),
        tag: "JavaScript, performance, optimization",
        answer: [
          {
            answer_id: 1,
            user: users[1], // Alice Smith provided this answer
            text: "You can improve JavaScript performance by optimizing your code, minimizing DOM manipulation, and using efficient algorithms.",
            time: new Date(),
            date: new Date(),
            image: new Uint8Array() // You may need to provide actual image data
          }
        ]
      },
      {
        question_id: 2,
        user: {
          user_id: 2,
          last_name: "Smith",
          first_name: "Alice",
          city: "Los Angeles",
          country: "USA",
          email: "alice@example.com",
          password: "alicepassword",
          number: "9876543210"
        },
        title: "Best practices for responsive web design?",
        text: "What are some best practices for creating responsive web designs that work well on all devices?",
        date: new Date(),
        time: new Date(),
        image: new Uint8Array(),
        tag: "web design, responsive design, CSS",
        answer: [
          {
            answer_id: 2,
            user: users[2], // Emily Brown provided this answer
            text: "For responsive web design, use media queries, fluid grids, and flexible images to ensure your site looks good on all devices.",
            time: new Date(),
            date: new Date(),
            image: new Uint8Array() // You may need to provide actual image data
          }
        ]
      },
      {
        question_id: 3,
        user: {
          user_id: 3,
          last_name: "Brown",
          first_name: "Emily",
          city: "London",
          country: "UK",
          email: "emily@example.com",
          password: "emilypassword",
          number: "444555666"
        },
        title: "How to handle user authentication in Angular applications?",
        text: "I'm building an Angular application and need guidance on implementing user authentication securely.",
        date: new Date(),
        time: new Date(),
        image: new Uint8Array(),
        tag: "Angular, authentication, security",
        answer: [
          {
            answer_id: 3,
            user: users[0], // John Doe provided this answer
            text: "To handle user authentication in Angular, you can use libraries like Angular Firebase or implement JWT authentication with an authentication service.",
            time: new Date(),
            date: new Date(),
            image: new Uint8Array() // You may need to provide actual image data
          }
        ]
      }
    ];


    const answers: AnswerModel[] = [
      {
        answer_id: 1,
        user: users[1], // Alice Smith provided this answer
        text: "You can improve JavaScript performance by optimizing your code, minimizing DOM manipulation, and using efficient algorithms.",
        time: new Date(),
        date: new Date(),
        image: new Uint8Array() // You may need to provide actual image data
      },
      {
        answer_id: 2,
        user: users[2], // Emily Brown provided this answer
        text: "For responsive web design, use media queries, fluid grids, and flexible images to ensure your site looks good on all devices.",
        time: new Date(),
        date: new Date(),
        image: new Uint8Array() // You may need to provide actual image data
      },
      {
        answer_id: 3,
        user: users[0], // John Doe provided this answer
        text: "To handle user authentication in Angular, you can use libraries like Angular Firebase or implement JWT authentication with an authentication service.",
        time: new Date(),
        date: new Date(),
        image: new Uint8Array() // You may need to provide actual image data
      }
    ];
    return {users, questions, answers};


  }
}
