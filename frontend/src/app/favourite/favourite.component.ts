import { Component, OnInit } from '@angular/core';
import {Favourite} from "../favourite";
import {MainService} from "../main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AllProducts} from "../allProducts";
import {HttpClient} from "@angular/common/http";

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
    private httpClient: HttpClient,
  )
   { }


  ngOnInit(): void {
    this.mainService.getFavourite().subscribe(data => {
      this.allProducts = data;
      this.hopeFinal();
    });
  }

  removeFavourite(id: number) {
    this.mainService.removeFavourite(id).subscribe(() => {
        this.mainService.getFavourite().subscribe(data => {
          this.allProducts = data;
        this.ngOnInit();

        });
    }
    );
  }


  postResponseF: any;
  dbImageF : Array<any> = [];
  dbImageId : Array<any> = [];

  hopeFinal() {
    this.httpClient.get('http://localhost:8080/getfavouriteimages')
      .subscribe(
        res => {
          this.postResponseF = res;
          for (let i = 0; i < this.postResponseF.length; i++) {
            this.dbImageF[i] = 'data:image/jpeg;base64,' + this.postResponseF[i].image;
            this.dbImageId[i] = this.postResponseF[i].id;
          }

          for(let i = 0; i < this.dbImageId.length; i++){
            this.map.set(this.dbImageId[i], this.dbImageF[i]);
          }


        }
      );
  }

  map = new Map();

  returnGoodImage(number: number) {

    if (this.map.has(number)) {
      return this.map.get(number);
    }
  }

}
