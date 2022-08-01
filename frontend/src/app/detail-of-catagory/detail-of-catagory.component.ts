import { Component, OnInit } from '@angular/core';
import {AllProducts} from "../allProducts";
import {MainService} from "../main.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-of-catagory',
  templateUrl: './detail-of-catagory.component.html',
  styleUrls: ['./detail-of-catagory.component.css']
})
export class DetailOfCatagoryComponent implements OnInit {

  allProducts: AllProducts[];

  public selected: string = 'ID';
  public isVisible: boolean = false;
  min_value: any;
  max_value: any;
  check_min_state: boolean = false;
  check_max_state: boolean = false;


  constructor(
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute,
  )
  {}

  ngOnInit(): void {
    this.mainService.getOneCategory().subscribe(data => {
      this.allProducts = data;
    });

  }

//Filtre

  changeState() {
    if (this.selected === 'Price') {
      this.allProducts.sort((a, b) => (a.price > b.price) ? 1 : -1)
    } else if (this.selected === 'Name') {
      this.allProducts.sort((a, b) => (a.name > b.name) ? 1 : -1)
    } else if (this.selected === 'Location') {
      this.allProducts.sort((a, b) => (a.localization > b.localization) ? 1 : -1)
    } else {
      this.allProducts.sort((a, b) => (a.countClicksOnProduct < b.countClicksOnProduct) ? 1 : -1)
    }
  }


  filterPrice() {
    if (this.check_min_state && this.check_max_state) {
      this.allProducts = this.allProducts.filter(value => value.price >= this.min_value);
      this.allProducts = this.allProducts.filter(value => value.price <= this.max_value);
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
