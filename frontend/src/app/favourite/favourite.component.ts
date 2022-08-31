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
          this.router.navigate(['/home']);

        });
    }
    );
  }

  postResponseF: any;
  dbImageF : Array<any> = [];

  hopeFinal() {
    this.httpClient.get('http://localhost:8080/getfavouriteimages')
      .subscribe(
        res => {
          this.postResponseF = res;
          for(let image of this.postResponseF){
            this.dbImageF.push('data:image/jpeg;base64,' + image.image);
          }
        }
      );
  }

}
