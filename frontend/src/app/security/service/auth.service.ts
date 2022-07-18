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
  data: any;


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

    //post username to http://localhost:8080/role

    // this.httpClient.post('http://localhost:8080/role', {"userName" : username})
    this.mainService.sendUserName(username).subscribe(() => {
   //  this.mainService.getUsersRole().pipe(subscribe(data => {

        //.subscribe(data => {
        //   this.httpClient.get('http://localhost:8080/role').pipe(
        //     tap(data => {
        //       this.data = data;


          // if (this.httpClient.get('http://localhost:8080/role').pipe(map(value => <boolean>value)) ) {
          //   this.isAdminLoggedIn = true;
          //
          // }
        }
    );

    if (username === 'admin' && password === 'pass') {
      this.isAdminLoggedIn = true;
    }
    this.whoIsLoggedIn = username;
    const info = btoa(`${username}:${password}`);
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
  }
}
