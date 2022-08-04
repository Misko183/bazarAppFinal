import { Component} from '@angular/core';
import {newUser} from "../user/new-user";
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import { delay } from 'rxjs/operators';
import {observable} from "rxjs";
import {element} from "protractor";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {

  userForm: any;
  user: newUser;
  check: Boolean = false;
  checkBadName: Boolean = false;
  usernameExist: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.CreateForm();
  }
  CreateForm() {
    this.userForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      //'confirmPassword': ['', [Validators.required]]
    });
  }

  saveUser(): void {
    if (this.userForm.dirty && this.userForm.valid) {
      this.user = {
        userName: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        //confirmPassword: this.userForm.value.confirmPassword,
      }
    }
    this.userService.save(this.user).subscribe(

      () => {
        this.userService.getUserMessege().subscribe((data) => {
        this.usernameExist = data;

        if (this.usernameExist === true) {
          this.checkBadName = false;
        this.check = true;
          setTimeout(() => {
            this.check = false;
            this.router.navigate(['/login']);
          }, 5000);
        }

            else {
              this.checkBadName = true;
              }

          }
        );
        }
    );




  }
}
