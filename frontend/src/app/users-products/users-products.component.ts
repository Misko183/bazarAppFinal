import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {AllProducts} from "../allProducts";

@Component({
  selector: 'app-users-products',
  templateUrl: './users-products.component.html',
  styleUrls: ['./users-products.component.css']
})
export class UsersProductsComponent implements OnInit {

  allProducts: AllProducts[];

  constructor(
    private mainService: MainService,
  )
  { }

  ngOnInit(): void {
    this.mainService.getUsersProducts().subscribe(data => {
      this.allProducts = data;
    });
  }

}
