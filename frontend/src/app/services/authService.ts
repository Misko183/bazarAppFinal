import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}


  private loginUrl = 'http://localhost:8080/api/login';
  private registerUrl = 'http://localhost:8080/api/userRegister';

  registerUser(user: User) {
    return this.http.post<User>(this.registerUrl, user);
  }


}
