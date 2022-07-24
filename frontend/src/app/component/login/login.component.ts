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

  //overenie požadovaného vyplnenia formulara
  loginGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  check: boolean = this.authService.check;

  login(): void {
    if (this.loginGroup.valid) {
      const username = this.loginGroup.value.username;

      const password = this.loginGroup.value.password;

      //poslanie prihlasovaních udajov na service na overenie
      this.authService.login(username, password)
        .subscribe(() => this.router.navigateByUrl('/home'));
    }
  }
}

