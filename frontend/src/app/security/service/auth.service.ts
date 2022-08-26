import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {MainService} from "../../main.service";
import {Router} from "@angular/router";
import {UserService} from "../../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  isAdminLoggedIn: boolean = false;
  whoIsLoggedIn: string;
  data: string;
  isSomeoneLoggedIn: boolean = false;
  check: boolean = false;
  changeName: string;

  constructor(
    private readonly httpClient: HttpClient,
    private mainService: MainService,
    private readonly router: Router,
    private userService: UserService,
  ) {
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  login(username: string, password: string): Observable<any> {
    this.check = false;
    this.userService.sendUserName(username,password).subscribe(() => {
    this.userService.getUsersRole().subscribe(data => {
      this.data = data.roles;
        if (this.data === "ADMIN" ) {
          this.isAdminLoggedIn = true;
          this.isSomeoneLoggedIn = true;
          this.whoIsLoggedIn = username;
        }
        if(this.data === "USER") {
          this.isSomeoneLoggedIn = true;
          this.whoIsLoggedIn = username;
        }


    });
    });

   //vratenie bez mäkčeňov
    let usernameWithoutAccents = username.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let passwordWithoutAccents = password.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    // const token = "Basic " +  window.btoa(usernameWithoutAccents + ':' + passwordWithoutAccents);
      const info = btoa(`${usernameWithoutAccents}:${passwordWithoutAccents}`);
      const token = `Basic ${info}`;
      const options = {
        headers: new HttpHeaders({
          Authorization: token,
          'X-Requested-With': 'XMLHttpRequest'
        }),
        withCredentials: true
      };
      return this.httpClient.get('http://localhost:8080/user', options).pipe(
        tap(() => this.token = token)
      );

    }


  logout(): void {
    this.token = null;
    this.whoIsLoggedIn = '';
    this.isSomeoneLoggedIn= false;
  }
}
