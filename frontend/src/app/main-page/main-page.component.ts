import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../main.service";

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
//button to go to the garden page
  goToGarden() {
    this.mainService.postCategory("Garden").subscribe( () => {
      this.router.navigate(['/garden']);
    });

  }

  goToElectronics() {
    this.mainService.postCategory("Electronic").subscribe( () => {
      this.router.navigate(['/electronic']);
    });

  }

  goToVehicles() {
    //post "vehicles" to the server
    this.mainService.postCategory("Vehicles").subscribe( () => {

      this.router.navigate(['/vehicles']);
  });

  }

}
