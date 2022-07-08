import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {AllProducts} from "../allProducts";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts: AllProducts[];

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts = data;
    } );
  }

}
