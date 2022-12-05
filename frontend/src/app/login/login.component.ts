import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  sessionId: any = "";
  authority: any = "";

  constructor(
      private router: Router,
      private http: HttpClient,
      private app: AppComponent,
  ) { }

  ngOnInit(): void {
  }

  refresh() {
    this.app.ngOnInit();
  }

  login() {
    let url = 'http://localhost:8080/api/login';
    this.http.post<any>(url, {
      username: this.model.username,
      password: this.model.password
    }).subscribe(res => {
      if (res) {
        this.sessionId = res.sessionId;
        this.authority = res.authority;


        sessionStorage.setItem(
          'token',
          this.sessionId
        );

        sessionStorage.setItem(
          'authority',
          this.authority
        );

        this.router.navigate(['home']);

        window.location.reload();

      } else {
          alert("Authentication failed.")
      }
    });

}

}
