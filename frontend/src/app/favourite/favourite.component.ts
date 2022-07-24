import { Component, OnInit } from '@angular/core';
import {Favourite} from "../favourite";
import {MainService} from "../main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AllProducts} from "../allProducts";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  allProducts: AllProducts[];

  constructor(
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute,
  )
   { }


  ngOnInit(): void {
    this.mainService.getFavourite().subscribe(data => {
      this.allProducts = data;
    });
  }


}
