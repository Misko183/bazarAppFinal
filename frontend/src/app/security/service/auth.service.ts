import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  isAdminLoggedIn: boolean = false;
  whoIsLoggedIn: string;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  login(username: string, password: string): Observable<any> {
    if (username === 'admin' && password === 'pass') {
      this.isAdminLoggedIn = true;
    }
    this.whoIsLoggedIn = username;
    const info = btoa(`${username}:${password}`);
    const token = `Basic ${info}`;
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
        'X-Requested-With' : 'XMLHttpRequest'
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
