import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../services/userService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-registration-by-email',
  templateUrl: './registration-by-email.component.html',
  styleUrls: ['./registration-by-email.component.css']
})
export class RegistrationByEmailComponent implements OnInit {


  user: User;

  constructor(private authService: UserService,
              private http: HttpClient) {
    this.user = new User();
  }

  checkBadRegister: boolean = false;
  message: any;
  status: any;
  messageTrue: boolean = false;
  reSTR: any;

  ngOnInit(): void {


  }

  onSubmit() {

    this.messageTrue = true;
    this.checkBadRegister = false;
    this.message = "Potvrď registráciu cez Email";
    this.http.post('http://localhost:8080/register', this.user).subscribe(
      data => {
        this.status = data;
       if(this.status.status === "error"){
         this.messageTrue = false;
         this.checkBadRegister = true;
         this.message = this.status.message;
       }
       // if(this.status.status === "success"){
       //    this.checkBadRegister = false;
       //   this.messageTrue = true;
       //   this.message = this.status.message;
       // }

      },
    );

  }
}


