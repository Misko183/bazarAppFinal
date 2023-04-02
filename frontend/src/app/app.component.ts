import {Component, Input, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthService} from "./security/authService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  navbarOpen = false;
  dropdownOpen = false;
  headerText: string;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

token: any = sessionStorage.getItem('token');
  constructor(
    private authServiceSecurtiy: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderText(event.urlAfterRedirects);
      }
    });
  }

  updateHeaderText(url: string) {
    switch (url) {
      case '/home':
        this.headerText = 'Domov';
        break;
      case '/login':
        this.headerText = 'Prihlásenie';
        break;
      case '/registrationByEmail':
        this.headerText = 'Registrácia';
        break;
      case '/createCategory':
        this.headerText = 'Vytvorenie kategórie';
        break;
      case '/addAdvertisement':
        this.headerText = 'Pridať inzerát';
        break;
      case '/usersAdvertisements':
        this.headerText = 'Moje inzeráty';
        break;
      case '/compareOfProducts':
        this.headerText = 'Porovnanie inzerátov';
        break;
      case '/favourite':
        this.headerText = 'Obľúbené';
        break;
      case '/usersProfile':
        this.headerText = 'Môj profil';
        break;
      case '/chat':
        this.headerText = 'Napísať používateľovi';
        break;
      case '/feedback':
        this.headerText = 'Spätná väzba';
        break;        
      default:
        this.headerText = 'Bazár';
        break;
    }
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



