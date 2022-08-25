import { Component, OnInit } from '@angular/core';
import {User} from "../user/user";
import {UserService} from "../user/user.service";
import {MainService} from "../main.service";
import {AuthService} from "../security/service/auth.service";
import {ModalService} from "../modal";
import {FormBuilder, Validators} from "@angular/forms";
import {newUser} from "../user/new-user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  users: User[];
  userForm: any;
  user: newUser;
  check: boolean = false;

  constructor(
    private userService: UserService,
    private mainService: MainService,
    private authService: AuthService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.showUserData();
    this.createForm();
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data => {
        this.users = data;
      }
    );
  }



  deleteUser(user: User) {
    if (confirm('Určite chcete vymazať použivateľa ' + user.userName + '?')) {
      this.userService.deleteUser(user).subscribe(() => {
          this.userService.findAll().subscribe(data => {
              this.users = data;
            }
          );
        }
      );
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdminLoggedIn;
  }


  showUserData() {
    this.mainService.getUsersRole().subscribe(data => {
        this.user = data;
      }
    );
  }

  logout() {
    this.authService.logout();
    this.authService.isAdminLoggedIn = false;
    this.authService.whoIsLoggedIn = '';
  }


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.mainService.getUsersRole().subscribe(data => {
        this.user = data;
      }
    );
  }

  editUser(): void {
    this.userService.editUser(this.user).subscribe(
      () => {
        this.check = true;
        setTimeout(() => {
          this.check = false;
          this.logout();
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


