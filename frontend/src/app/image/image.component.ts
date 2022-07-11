import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent{

  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  imageID: any = 5;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  viewImage() {
    this.httpClient.get('http://localhost:8080/get/image/info/' + this.imageID)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }

}
