import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {MainService} from "../../main.service";

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


  constructor(
    private readonly httpClient: HttpClient,
    private mainService: MainService,
  ) {
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  login(username: string, password: string): Observable<any> {

    this.mainService.sendUserName(username).subscribe(() => {

    this.mainService.getUsersRole().subscribe(data => {
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

      const info = btoa(`${username}:${password}`);
      const token = `Basic ${info}`;
    //  this.isSomeoneLoggedIn = true;
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
