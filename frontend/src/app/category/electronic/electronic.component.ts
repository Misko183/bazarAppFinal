import { Component, OnInit } from '@angular/core';
import {AllProducts} from "../../allProducts";
import {MainService} from "../../main.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-electronic',
  templateUrl: './electronic.component.html',
  styleUrls: ['./electronic.component.css']
})
export class ElectronicComponent implements OnInit {

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
