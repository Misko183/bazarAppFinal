import { Component, OnInit } from '@angular/core';
import {User} from "../user/user";
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {newUser} from "../user/new-user";
import {AuthService} from "../security/service/auth.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userExist: User;
  userForm: any;
  user: newUser;


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  this.showUserData();
    this.createForm();
  }

  ngOnInit(): void {

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

  editUser(): void {
    this.userService.editUser(this.user).subscribe(
      () => {
        this.logout();
        this.router.navigate(['/login']);
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

  saveUser(): void {
    if (this.userForm.dirty && this.userForm.valid) {
      this.user = {
        userName: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        phone: this.userForm.value.phone,
        address: this.userForm.value.address
        //confirmPassword: this.userForm.value.confirmPassword,
      }
    }
    this.userService.save(this.user).subscribe(
      () => {
       // this.router.navigate(['/profile']);
      }
    );
  }
}
