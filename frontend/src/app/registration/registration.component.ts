import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../services/userService";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  user: User;
  constructor(private authService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit() {

      this.authService.registerUser(this.user).subscribe(
        (data) => {
          console.log(data);
        }
      );

  }
}
