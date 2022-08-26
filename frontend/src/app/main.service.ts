import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllProducts} from "./allProducts";
import {User} from "./user/user";
import {Favourite} from "./favourite";
import {Feedback} from "./feedback";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private getAllProductsUrl: string;
  private addProductUrl: string;
  private getCategoryUrl: string;
  private postCategoryUrl: string;
  private usersProductsUrl: string;
  private favouriteUrl: string;
  private updateProductUrl: string;
  private deleteProductUrl: string;
  private feedbackUrl: string;
  private deleteFeedbackUrl: string;
  private removeFavoriteUrl: string;

  constructor(private http: HttpClient) {
    this.getAllProductsUrl = 'http://localhost:8080/advertisement';
    this.addProductUrl = 'http://localhost:8080/advertisement';
    this.getCategoryUrl = 'http://localhost:8080/advertisement/category';
    this.postCategoryUrl = 'http://localhost:8080/category';
    this.usersProductsUrl = 'http://localhost:8080/myproducts';
    this.favouriteUrl = 'http://localhost:8080/favourite';
    this.updateProductUrl = 'http://localhost:8080/updateproduct';
    this.deleteProductUrl = 'http://localhost:8080/deleteproduct';
    this.feedbackUrl = 'http://localhost:8080/feedback';
    this.deleteFeedbackUrl = 'http://localhost:8080/deletefeedback';
    this.removeFavoriteUrl = 'http://localhost:8080/removefavourite';
  }

  public getAllProducts(): Observable<AllProducts[]> {
    return this.http.get<AllProducts[]>(this.getAllProductsUrl);
  }
  public addProduct(product: AllProducts) {
    return this.http.post<AllProducts>(this.addProductUrl, product);
  }
  public updateProduct(product: AllProducts) {
    return this.http.post<AllProducts>(this.updateProductUrl, product);
  }
  public deleteProduct(product: AllProducts){
    return this.http.post<AllProducts>(this.deleteProductUrl, product);
  }
  public getOneCategory(): Observable<AllProducts[]>{
    return this.http.get<AllProducts[]>(this.getCategoryUrl);
  }
  public postCategory(category: string) {
    return this.http.post<string>(this.postCategoryUrl, category);
  }
  public getUsersProducts(): Observable<AllProducts[]> {
    return this.http.get<AllProducts[]>(this.usersProductsUrl);
  }
  public addToFavourite(product: number, user: number) {
    return this.http.post<Favourite>(this.favouriteUrl, {"product" :{ "id": product}, "user" : {"id": user}});
  }
  public getFavourite(): Observable<AllProducts[]> {
    return this.http.get<AllProducts[]>(this.favouriteUrl);
  }
  public removeFavourite(product: number){
    return this.http.post<Favourite>(this.removeFavoriteUrl, {"product" :{ "id": product}});
  }
  public postFeedback(feedback: Feedback) {
    return this.http.post<Feedback>(this.feedbackUrl, feedback);
  }
  public getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.feedbackUrl);
  }
  public deleteFeedback(feedback: Feedback){
    return this.http.post<Feedback>(this.deleteFeedbackUrl, feedback);
  }
}
