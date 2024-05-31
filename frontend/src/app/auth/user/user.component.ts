import {Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  users: UserModel[] = [];
  currentUser: UserModel | null = null;

  constructor(private userService: UserService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    } else {
      // Handle the case where there is no logged-in user
      console.error('No user is loggedin.');
    }
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  banUser(bannedId: number): void {
    if(this.currentUser) {
      this.userService.banUser(this.currentUser.user_id, bannedId).subscribe(() => {
        this.updateUserStatus(bannedId, "BANNED");
      }, error => console.error('Failed to ban user:', error));
    } else {
      console.error("You must be logged in");
    }
  }

  unbanUser(bannedId: number): void {
    if (this.currentUser) {
      this.userService.unbanUser(this.currentUser.user_id, bannedId).subscribe(() => {
        this.updateUserStatus(bannedId, "UNBANNED");
      }, error => console.error('Failed to unban user:', error));
    } else {
      console.error("You must be logged in");
    }

  }

  private updateUserStatus(userId: number, isBanned: string): void {
    const user = this.users.find(u => u.user_id === userId);
    if (user) {
      user.ban = isBanned;
    }
  }
}
