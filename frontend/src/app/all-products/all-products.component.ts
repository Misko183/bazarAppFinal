import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {AllProducts} from "../allProducts";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


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

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    ) {
    this.detailID = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts = data;


    } );

  }


  viewImage(number: number) {
    this.httpClient.get('http://localhost:8080/get/image/info/' + number)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
  }


}
