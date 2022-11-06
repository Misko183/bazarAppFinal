import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

token: any = sessionStorage.getItem('token');


  ngOnInit(): void {

  }



  logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
    this.ngOnInit();
  }
}



