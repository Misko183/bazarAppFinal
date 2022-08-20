import { Component, OnInit } from '@angular/core';
import {User} from "../user/user";
import {UserService} from "../user/user.service";
import {MainService} from "../main.service";
import {AuthService} from "../security/service/auth.service";

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  users: User[];
  user: User;

  constructor(
    private userService: UserService,
    private mainService: MainService,
    private authService: AuthService,
  )
  {}


  ngOnInit(): void {
   this.userService.findAll().subscribe(data => {
      this.users = data;
    }
   );
   this.getUserInfo();
  }

  deleteUser(user: User) {
if (confirm('Určite chcete vymazať použivateľa '+user.userName +'?'))  {
    this.userService.deleteUser(user).subscribe(() => {
      this.userService.findAll().subscribe(data => {
          this.users = data;
        }
      );
    }
    );
    }
  }

  getUserInfo() {
    this.mainService.getUsersRole().subscribe(data => {
        this.user = data;
      }
    );
  }

  isAdmin(): boolean{
    return this.authService.isAdminLoggedIn;
  }


}
