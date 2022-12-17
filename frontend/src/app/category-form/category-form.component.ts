import { Component, OnInit } from '@angular/core';
import {MainService} from "../services/mainService";
import {Category} from "../category";
import {AllProducts} from "../allProducts";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category;
  uploadedImage: File;



  constructor(private mainService: MainService,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
) {
    this.category = new Category();

  }

  ngOnInit(): void {
  }


  public onImageUpload({event}: { event: any }) {
    this.uploadedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.liveDemo = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  liveDemo:any;

  createCategory() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage);


    this.httpClient.post('http://localhost:8080/upload/categoryimage/', imageFormData, { observe: 'response' })
      .subscribe(() => {
         this.mainService.postKindOfCategory(this.category).subscribe(() => this.router.navigate(['/home']));

        }
      );
  }

}
