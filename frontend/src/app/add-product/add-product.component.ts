import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../services/mainService";
import {AllProducts} from "../allProducts";
import {Category} from "../category";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent  {

  allProducts: AllProducts;
  allProductsArray: AllProducts[];
  categoryArray: Category[];
  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;
  selectedCategory: any;
  array: [];





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService,
    private httpClient: HttpClient,
    public sanitizer: DomSanitizer
  ) {
    this.returnCategory();
    this.allProducts = new AllProducts();
  }

  gotoProductList() {
    this.router.navigate(['/home']);
  }

  gotoUsersProducts() {
    this.router.navigate(['/usersAdvertisements']);
  }

  returnCategory() {
    this.mainService.getKindOfCategory().forEach((category) => {
      this.categoryArray = category;

      }
    );

  }


  selectedFiles: File[] = [];
  selectedFilesUrls: string[] = [];


  onImagesUpload({event}: { event: any}) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i]);
      this.selectedFilesUrls.push(URL.createObjectURL(event.target.files[i]));
    }
  }

  removeSelectedFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.selectedFilesUrls.splice(index, 1);
  }

  uploadFiles() {
    const formData = new FormData();
    const mainData = new FormData();
    mainData.append('image', this.selectedFiles[0])
    for (let i = 1; i < this.selectedFiles.length; i++) {
      formData.append('image', this.selectedFiles[i]);
    }
       this.httpClient.post('http://localhost:8080/upload/image/', mainData, { observe: 'response' })
      .subscribe(() => {
        if (this.selectedFiles.length > 1){
       this.httpClient.post('http://localhost:8080/upload/anotherImage', formData, ).subscribe(response => {
        console.log(response);
        this.mainService.addProduct(this.allProducts).subscribe(() => this.gotoUsersProducts());
      }
      )
    }
      else {
          this.mainService.addProduct(this.allProducts).subscribe(() => this.gotoUsersProducts());
        }
      });
  }

// /upload/anotherImage

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
    this.allProducts.kindOfCategory= this.selectedCategory;
  }
}
