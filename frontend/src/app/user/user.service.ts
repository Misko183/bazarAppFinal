import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import {newUser} from "./new-user";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  private usersUrl: string;
  private usermessegeUrl: string;
  private allUsersUrl: string;
  private deleteUserUrl: string;
  private editUserUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/createUser';
    this.usermessegeUrl = 'http://localhost:8080/usermessege';
    this.allUsersUrl = 'http://localhost:8080/users';
    this.deleteUserUrl = 'http://localhost:8080/deleteuser';
    this.editUserUrl = 'http://localhost:8080/edituser';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.allUsersUrl);
  }

  public save(user: newUser) {
    return this.http.post<newUser>(this.usersUrl, user, {observe: 'response'});
  }

  public deleteUser(user: User) {
    return this.http.post<User>(this.deleteUserUrl, user);
  }

  public getUserMessege(): Observable<Boolean> {
    return this.http.get<Boolean>(this.usermessegeUrl);
  }
  public editUser(user: newUser) {
    return this.http.post<newUser>(this.editUserUrl, user);
  }
}
