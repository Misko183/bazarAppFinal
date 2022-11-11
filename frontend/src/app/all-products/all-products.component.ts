import { Component, OnInit } from '@angular/core';
import {MainService} from "../services/mainService";
import {AllProducts} from "../allProducts";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
// import {ifError} from "assert";
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
  detailID: number;


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
    ) {

    this.detailID  = + this.route.snapshot.paramMap.get('id');


  }



  ngOnInit(): void {
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts = data;
       this.hopeFinal();

    } );
  }


postResponseF: any;
dbImageF : Array<any> = [];
  dbImageId : Array<any> = [];

  hopeFinal() {
    this.httpClient.get('http://localhost:8080/getallimages')
      .subscribe(


        res => {
          this.postResponseF = res;
          for (let i = 0; i < this.postResponseF.length; i++) {
            this.dbImageF[i] = 'data:image/jpeg;base64,' + this.postResponseF[i].image;
            this.dbImageId[i] = this.postResponseF[i].id;
          }

          for(let i = 0; i < this.dbImageId.length; i++){
            this.map.set(this.dbImageId[i], this.dbImageF[i]);
          }


        }
      );
  }

  map = new Map();

  returnGoodImage(number: number) {

    if (this.map.has(number)) {
      return this.map.get(number);
    }
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
