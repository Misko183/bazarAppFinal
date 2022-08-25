import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main.service";
import {ModalService} from "../modal/modal.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    private router: Router,
    private mainService: MainService,
    )
  { }

  ngOnInit(): void {
  }

  goToGarden() {
    this.mainService.postCategory("Garden").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

  goToElectronics() {
    this.mainService.postCategory("Electronic").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

  goToVehicles() {
    this.mainService.postCategory("Vehicles").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
  });
  }

  goToToys() {
    this.mainService.postCategory("Toys").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

  goToClothes() {
    this.mainService.postCategory("Clothes").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

  goToPets() {
    this.mainService.postCategory("Pets").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

  goToHouse() {
    this.mainService.postCategory("House").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

  goToSport() {
    this.mainService.postCategory("Sport").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

  goToFurniture() {
    this.mainService.postCategory("Furniture").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

  goToHomeElectronics() {
    this.mainService.postCategory("HomeElectronics").subscribe( () => {
      this.router.navigate(['/detailcatagory']);
    });
  }

}
