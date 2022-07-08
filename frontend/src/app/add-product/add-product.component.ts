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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService,
    private httpClient: HttpClient
  ) {
    this.allProducts = new AllProducts();
  }

  onSubmit() {
    this.mainService.addProduct(this.allProducts).subscribe(() => this.gotoProductList());
  }
  gotoProductList() {
    this.router.navigate(['/home']);
  }

}
