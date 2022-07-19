import { Component, OnInit } from '@angular/core';
import {AllProducts} from "../allProducts";
import {MainService} from "../main.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-of-catagory',
  templateUrl: './detail-of-catagory.component.html',
  styleUrls: ['./detail-of-catagory.component.css']
})
export class DetailOfCatagoryComponent implements OnInit {

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
