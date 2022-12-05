import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  isLoggedIn() {
    return sessionStorage.getItem('token');
  }

  getAuthority() {
    if (sessionStorage.getItem('authority') == "ADMIN") {
      return sessionStorage.getItem('authority');
    }
  }
}
