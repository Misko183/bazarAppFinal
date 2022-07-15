import { Component } from '@angular/core';
import {AuthService} from "./security/service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(private authService: AuthService) {

 }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getWhoIsLoggedIn(): string {
    return this.authService.whoIsLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.authService.isAdminLoggedIn = false;
    this.authService.whoIsLoggedIn = '';
  }

  isAdminLoggedIn() {
    return this.authService.isAdminLoggedIn;
  }

}
