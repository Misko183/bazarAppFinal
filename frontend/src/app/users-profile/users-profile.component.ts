import { Component, OnInit } from '@angular/core';
import {User} from "../user";
// import {UserService} from "../user/user.service";
import {MainService} from "../services/mainService";
import {AuthService} from "../services/authService";
import {ModalService} from "../modal";
import {FormBuilder, Validators} from "@angular/forms";
// import {User} from "../user";
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  users: User[];
  userForm: any;
  user: User;
  check: boolean = false;

  constructor(
    // private userService: UserService,
    private mainService: MainService,
    private authService: AuthService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private app: AppComponent
  ) {
    this.showUserData();
    this.createForm();
  }

  ngOnInit(): void {
    this.authService.findAll().subscribe(data => {
        this.users = data;
      }
    );
  }



  deleteUser(user: User) {
    if (confirm('Určite chcete vymazať použivateľa ' + user.username + '?')) {
      this.authService.deleteUser(user).subscribe(() => {
          this.authService.findAll().subscribe(data => {
              this.users = data;
            }
          );
        }
      );
    }
  }

  // isAdmin(): boolean {
  //   return this.authService.isAdminLoggedIn;
  // }


  showUserData() {
    this.authService.getUsersRole().subscribe(data => {
        this.user = data;
      }
    );
  }

  // logout() {
  //   this.authService.logout();
  //   this.authService.isAdminLoggedIn = false;
  //   this.authService.whoIsLoggedIn = '';
  // }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.authService.getUsersRole().subscribe(data => {
        this.user = data;
      }
    );
  }

  editUser(): void {
    this.authService.editUser(this.user).subscribe(
      () => {
        this.check = true;
        setTimeout(() => {
          this.check = false;
          // this.logout();
          this.app.logout();
          this.router.navigate(['/login']);
        }, 5000);

      }
    );
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'phone': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      //'confirmPassword': ['', [Validators.required]]
    });
  }

}


