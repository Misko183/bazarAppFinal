import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {AllProducts} from "../allProducts";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../security/service/auth.service";

@Component({
  selector: 'app-users-products',
  templateUrl: './users-products.component.html',
  styleUrls: ['./users-products.component.css']
})
export class UsersProductsComponent implements OnInit {

  allProducts: AllProducts[];
  allProducts1: AllProducts;
  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  )
  { }

  ngOnInit(): void {
    this.mainService.getUsersProducts().subscribe(data => {
      this.allProducts = data;
    });

  }
  deleteProduct(id: number) {
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts1 = data.find(product => product.id === id);
    this.mainService.deleteProduct(this.allProducts1).subscribe(() => {
      this.router.navigate(['/home']);
    } );
    } );
  }

  isSomeoneLogIn() {
    return this.authService.isSomeoneLoggedIn;
  }
}
