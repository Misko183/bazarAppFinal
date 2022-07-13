import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main.service";
import {AllProducts} from "../allProducts";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent  {

  allProducts: AllProducts;
  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService,
    private httpClient: HttpClient
  ) {
    this.allProducts = new AllProducts();
  }
  
  gotoProductList() {
    this.router.navigate(['/home']);
  }


  public onImageUpload({event}: { event: any }) {
    this.uploadedImage = event.target.files[0];
  }

  createAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


    this.httpClient.post('http://localhost:8080/upload/image/', imageFormData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.postResponse = response;
            this.successResponse = this.postResponse.body.message;
          } else {
            this.successResponse = 'Image not uploaded due to some error!';
          }
        this.mainService.addProduct(this.allProducts).subscribe(() => this.gotoProductList());
        }
      );
  }
}
