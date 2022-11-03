import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authService';

@Injectable({
  providedIn: 'root'
})
export class DisableLoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isLoggedIn() != null) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
