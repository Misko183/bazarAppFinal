import { Component, OnInit } from '@angular/core';
import {MainService} from "../../main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AllProducts} from "../../allProducts";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  allProducts: AllProducts[];

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


  //get
}
