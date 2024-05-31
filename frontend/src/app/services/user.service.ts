import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/user';  // URL to web api

  constructor(private http: HttpClient) { }

  // register(user: any): Observable<any> {
  //   return this.http.post<any>(`${this.userUrl}/register`, user);
  // }

  register(username: string, password: string): Observable<any> {
    const url = `${this.userUrl}/register/${username}/${password}`;
    return this.http.get(url);  // Using GET for demonstration as per your scenario
}


  findUserByEmail (
    email:string,
    password: string
  ):Observable<UserModel> { return this.http.get<UserModel>(`${this.userUrl}/1`) }

  findUserByUsername(username: string): Observable<UserModel> {
    const url = `${this.userUrl}/getUserByUsername/${username}`;
    return this.http.get<UserModel>(url);
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.userUrl+'/getAllUsers');
  }

  banUser(userId: number, bannedId: number): Observable<void> {
    return this.http.post<void>(`${this.userUrl}/ban/${bannedId}`, userId);
  }

  unbanUser(userId: number, bannedId: number): Observable<void> {
    return this.http.post<void>(`${this.userUrl}/unban/${bannedId}`, userId);
  }

}
