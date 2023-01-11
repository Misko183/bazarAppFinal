import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthService} from "./security/authService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

token: any = sessionStorage.getItem('token');
  constructor(
    private authServiceSecurtiy: AuthService
  ) {
  }

  ngOnInit(): void {

  }


  open: boolean = true;
  activate() {
    this.open = !this.open;
    console.log(this.open);
  }



  dothat() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelector(".nav-links li");

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      // links. (link => {
      //   link.classList.toggle("fade");
      // });
    });
  }

  login() {
    this.ngOnInit();
  }

  logout() {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
    // this.ngOnInit();
  }

  isAdmin(): boolean{
    if(this.authServiceSecurtiy.getAuthority())
    {return true;}
  }
}



