import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../security/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  skuska: boolean = false;

  login(): void {
    if (this.loginGroup.valid) {
      const username = this.loginGroup.value.username;
      // if username is admin, skuska is true
      if (username === 'admin') {
        this.skuska = true;
      }
      const password = this.loginGroup.value.password;
      this.authService.login(username, password)
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
  }
}
