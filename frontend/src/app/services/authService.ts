import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}


  private loginUrl = 'http://localhost:8080/api/login';
  private registerUrl = 'http://localhost:8080/api/userRegister';
  private deleteUserUrl = 'http://localhost:8080/api/deleteuser';
  private editUserUrl = 'http://localhost:8080/api/edituser';
  private allUsersUrl = 'http://localhost:8080/api/users';
  private sendUser = 'http://localhost:8080/api/infoAboutUser';

  registerUser(user: User) {
    return this.http.post<User>(this.registerUrl, user);
  }

  public deleteUser(user: User) {
    return this.http.post<User>(this.deleteUserUrl, user);
  }

  public editUser(user: User) {
    return this.http.post<User>(this.editUserUrl, user);
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.allUsersUrl);
  }

  public getUsersRole(): Observable<User> {
    return this.http.get<User>(this.sendUser);
  }

}
