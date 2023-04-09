import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-confirm-verification',
  templateUrl: './confirm-verification.component.html',
  styleUrls: ['./confirm-verification.component.css']
})
export class ConfirmVerificationComponent implements OnInit {

  constructor(
    http: HttpClient,
    router: Router,
  ) {
    http.get('http://localhost:8080/confirm-account?token=' + router.url.split('=')[1]).subscribe(
      () => {

      }
    );
    setTimeout(() => {
      router.navigate(['/login']);
    } , 500000);


  }

  ngOnInit(): void {



  }

}
