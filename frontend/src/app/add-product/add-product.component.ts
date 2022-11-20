import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../services/mainService";
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
  selectedCategory: string;


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

  gotoUsersProducts() {
    this.router.navigate(['/myproducts']);
  }


  public onImageUpload({event}: { event: any }) {
    this.uploadedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.liveDemo = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  liveDemo:any;


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

        this.mainService.addProduct(this.allProducts).subscribe(() => this.gotoUsersProducts());
        }
      );
  }

  chooseCategory() {
    if (this.selectedCategory === 'Electronic') {
      this.allProducts.category = 'Electronic';
    } else if (this.selectedCategory === 'Garden') {
      this.allProducts.category = 'Garden';
    } else if (this.selectedCategory === 'Vehicles') {
      this.allProducts.category = 'Vehicles';
    } else if (this.selectedCategory === 'Toys') {
      this.allProducts.category = 'Toys';
    } else if (this.selectedCategory === 'Clothes') {
      this.allProducts.category = 'Clothes';
    } else if (this.selectedCategory === 'Pets') {
      this.allProducts.category = 'Pets';
    } else if (this.selectedCategory === 'Sport') {
      this.allProducts.category = 'Sport';
    } else if (this.selectedCategory === 'House') {
      this.allProducts.category = 'House';
    } else if (this.selectedCategory === 'HomeElectronics') {
      this.allProducts.category = 'HomeElectronics';
    } else if (this.selectedCategory === 'Furniture') {
      this.allProducts.category = 'Furniture';
    }
  }
}
