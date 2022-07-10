import { Component, OnInit } from '@angular/core';
import {AllProducts} from "../../allProducts";
import {MainService} from "../../main.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.css']
})
export class GardenComponent implements OnInit {

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

}
