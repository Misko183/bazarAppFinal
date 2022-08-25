import { Component, OnInit } from '@angular/core';
import {AllProducts} from "../allProducts";
import {AuthService} from "../security/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main.service";
import {UsersProductsComponent} from "../users-products/users-products.component";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  allProducts: AllProducts;


  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
 //   private readonly usersProductsComponent: UsersProductsComponent,
  ) { }

  ngOnInit(): void {
  }

  editProduct(id: number) {

  }

}
