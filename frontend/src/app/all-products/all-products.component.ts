import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {AllProducts} from "../allProducts";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ifError} from "assert";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {Image} from "../image";


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts: AllProducts[];
  allProducts1: AllProducts;
  detailID: number;
  dbImage: any;
  postResponse: any;
  skusimId: any;
  dbImage1: any;
  postResponse1: any;

  random:number = 0;

  public selected: string = 'ID';
  public isVisible: boolean = false;
  min_value: any;
  max_value: any;
  check_min_state: boolean = false;
  check_max_state: boolean = false;



  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
 //   private imageService: Image,
    ) {
    this.detailID = +this.route.snapshot.paramMap.get('id');


  }

  length: number = 0;

  ngOnInit(): void {
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts = data;
      this.length = this.allProducts.length;
  this.start();
  this.hopeFinal();
//this.showImage();
    } );
  }

  lll: number = 0;
start() {
    for(let i = 0; i < 1; i++){
  for (let product of this.allProducts) {
    this.listNum.push(product.image.id);
    this.lll++;
  }
      if(this.lll == this.allProducts.length){
        for (let i = 0; i < this.listNum.length; i++) {
          this.viewImage(this.listNum[i]);

        }
      }
  }


}

list: Array<any> = [];

listNum: Array<any> = [];

// toList(number: number) {
//
//
//
//   for (let i = 0; i < this.listNum.length; i++) {
//     this.viewImage(this.listNum[i]);
//   }
//
// }
  random1: number = 0;
  viewImage(number: number) {

    this.httpClient.get('http://localhost:8080/get/image/info/' + number)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
         //  this.allProducts1.image.any = this.dbImage;
        //if list dont contains dbImage
        //   if (!this.list.includes(this.dbImage)) {
        //delay before adding to list

              this.list.push(this.dbImage);
              this.random1 = this.random1 + 1;

        //   }
        }
      );
  }


  showImage(aaa: number) {

    this.httpClient.get('http://localhost:8080/get/image/info/' + aaa)
      .subscribe(
        res => {
          this.postResponse1 = res;
          this.dbImage1 = 'data:image/jpeg;base64,' + this.postResponse1.image;
        }
      );
  }

  // ukaz(number: number) {
  //   return this.imageService.showImg(number);
  // }

  plus()
  {
    this.random++;
  }
  postResponse2: any;
  dbImage2 : any;

  justShow() {  //just show image
    this.httpClient.get('http://localhost:8080/get/image/1')
      .subscribe(
        res => {
          this.postResponse2 = res;
          this.dbImage2 = 'data:image/jpeg;base64,' + this.postResponse2.image;
        }
      );
  }

  postResponse3: any;
  dbImage3 : any;
  bum: number = 0;
  listNumlock: Array<any> = [];
  test: boolean = false;

  ukazMiLasku(prosim: number) {
    this.httpClient.get('http://localhost:8080/get/image/info/' + prosim)
      .subscribe(
        res => {
          this.postResponse3 = res;
       this.dbImage3 = 'data:image/jpeg;base64,' + this.postResponse3.image;
        if (!this.listNumlock.includes(this.dbImage3)) {
          this.test = true;
          this.listNumlock.push(this.dbImage3);
          this.bum++;
        }

        }
      );

  }

  scitaj: number = 0;

postResponseF: any;
dbImageF : Array<any> = [];
arrayNumberF: number = 0;

  hopeFinal() {
    this.httpClient.get('http://localhost:8080/getallimages')
      .subscribe(
        //for each save to array
        // res => {
        //   this.postResponseF = res;
        //   for (let i = 0; i < this.postResponseF.length; i++) {
        //     this.dbImageF.push('data:image/jpeg;base64,' + this.postResponseF[i].image);
        //   }
        // }




        res => {
          this.postResponseF = res;
          for(let image of this.postResponseF){
            this.dbImageF.push('data:image/jpeg;base64,' + image.image);
          }
        }
      );
  }

plusNumber() {


}


//Filtre

  changeState() {
    if (this.selected === 'PriceMin') {
      this.allProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
      this.allProducts.sort((a, b) => (parseInt(a.price) > parseInt(b.price) ? 1 : -1))
    } else if (this.selected === 'PriceMax') {
      this.allProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
      this.allProducts.sort((a, b) => (parseInt(a.price) < parseInt(b.price) ? 1 : -1))
    } else if (this.selected === 'Name') {
      this.allProducts.sort((a, b) => (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "") > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ? 1 : -1)
    } else if (this.selected === 'Location') {
      this.allProducts.sort((a, b) => (a.localization.normalize('NFD').replace(/[\u0300-\u036f]/g, "") > b.localization.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) ? 1 : -1)
    } else {
      this.allProducts.sort((a, b) => (a.countClicksOnProduct < b.countClicksOnProduct) ? 1 : -1)
    }

  }


  filterPrice() {
    if (this.check_min_state && this.check_max_state) {
      this.allProducts = this.allProducts.filter(value => parseInt(value.price) >= this.min_value);
      this.allProducts = this.allProducts.filter(value => parseInt(value.price) <= this.max_value);
    }
  }

  onMaxChange(value: any) {
    this.max_value = value;
    this.check_max_state = this.max_value != '';
  }

  onMinChange(value: any) {
    this.min_value = value;
    this.check_min_state = this.min_value != '';
  }

  resetFilter() {
    this.min_value = '';
    this.max_value = '';
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts = data;
    });
  }

  filterProduct(event: any) {
    let searchValue = event.target.value;
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts = data.filter(value => value.name.toLowerCase().includes(searchValue.toLowerCase()));
    });
  }

  onlyNumbers(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

}
