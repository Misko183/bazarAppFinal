import { Component, OnInit } from '@angular/core';
import {AllProducts} from "../allProducts";
import {MainService} from "../services/mainService";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/userService";
import {ModalService} from "../modal";
import {AuthService} from "../security/authService";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {


  oneProcust: AllProducts;
  detailID: number;
  dbImage: any;
  postResponse: any;

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private authService: UserService,
    private modalService: ModalService,
    private authServiceSecurtiy: AuthService,
  ) {

  }

  ngOnInit(): void {
    // this.findProduct();
    this.findCompareProducts();
    this.viewImage();
    this.viewImageAnother();
    this.viewImage2();
    this.viewImageAnother2();
  }

  firstProduct: AllProducts;
  secondProduct: AllProducts;
  compareProducts: any;


  findCompareProducts() {
    this.mainService.getCompareProduct().subscribe(data => {
      this.compareProducts = data;
      this.firstProduct = this.compareProducts.product1;
      this.secondProduct = this.compareProducts.product2;
      console.log(this.firstProduct);
      console.log(this.secondProduct);
    } );
    }



  //
  // findProduct() {
  //   this.mainService.getAllProducts().subscribe(data => {
  //     this.allProducts = data.find(product => product.id === this.detailID);
  //     this.mainService.updateProduct(this.allProducts).subscribe();
  //   } );
  // }

  viewImage() {

    this.mainService.getCompareProduct().subscribe(data => {
      this.compareProducts = data;
      this.firstProduct = this.compareProducts.product1;

      this.httpClient.get('http://localhost:8080/get/image/info/' + this.firstProduct.image.id)
        .subscribe(
          res => {
            this.postResponse = res;
            this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
          }
        );
    });
  }

  dbImages : any = [];
  postResponse2: any;

  viewImageAnother() {
    this.mainService.getCompareProduct().subscribe(data => {
      this.compareProducts = data;
      this.firstProduct = this.compareProducts.product1;
      this.httpClient.get('http://localhost:8080/get/images/info/' + this.firstProduct.image.id)
        .subscribe(
          res => {
            this.postResponse2 = res;
            for (let i = 0; i < this.postResponse2.length; i++ ){
              this.dbImages[i] = 'data:image/jpeg;base64,' + this.postResponse2[i].image;
              console.log(this.dbImages)
            }
          }
        );
    });
  }

  dbImage2: any;
  dbImages2 : any = [];
  postResponse3: any;
  postResponse4: any;

  viewImage2() {
    this.mainService.getCompareProduct().subscribe(data => {
      this.compareProducts = data;
      this.secondProduct = this.compareProducts.product2;

      this.httpClient.get('http://localhost:8080/get/image/info/' + this.secondProduct.image.id)
        .subscribe(
          res => {
            this.postResponse3 = res;
            this.dbImage2 = 'data:image/jpeg;base64,' + this.postResponse3.image;
          }
        );
    });
  }


  viewImageAnother2() {
    this.mainService.getCompareProduct().subscribe(data => {
      this.compareProducts = data;
      this.secondProduct = this.compareProducts.product2;
      this.httpClient.get('http://localhost:8080/get/images/info/' + this.secondProduct.image.id)
        .subscribe(
          res => {
            this.postResponse4 = res;
            for (let i = 0; i < this.postResponse4.length; i++ ){
              this.dbImages2[i] = 'data:image/jpeg;base64,' + this.postResponse4[i].image;
              console.log(this.dbImages2)
            }
          }
        );
    });
  }




currentImage: any;

  openModal(id: string, image: any) {
    this.modalService.open(id);
    this.currentImage = image;
  }

  currentImages: any;

  openModal2(id: string, image: any) {
    this.modalService.open(id);
    this.currentImages = image;
  }

  closeModal(id: string) {
    this.modalService.close(id);

  }

}
