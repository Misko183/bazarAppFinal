import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import {newUser} from "./new-user";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  private usersUrl: string;
  private usermessegeUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/createUser';
    this.usermessegeUrl = 'http://localhost:8080/usermessege';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public save(user: newUser) {
    return this.http.post<newUser>(this.usersUrl, user, {observe: 'response'});
  }

  public getUserMessege(): Observable<Boolean> {
    return this.http.get<Boolean>(this.usermessegeUrl);

  }
}
