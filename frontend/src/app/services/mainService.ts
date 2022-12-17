import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllProducts} from "../allProducts";
import {Feedback} from "../feedback";
import {Favourite} from "../favourite";
import {Category} from "../category";


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
  private editProductUrl: string;
  private feedbackUrl: string;
  private deleteFeedbackUrl: string;
  private removeFavoriteUrl: string;
  private postKindOfCategoryUrl: string;
  private getKindOfCategoryUrl: string;
  private getProductsByCategoryUrl: string;
  private postProductsByCategoryUrl: string;
  private getImageUrl: string;
  private getCategoryImageUrl: string;

  constructor(private http: HttpClient) {
    this.getAllProductsUrl = 'http://localhost:8080/advertisement';
    this.addProductUrl = 'http://localhost:8080/advertisement';
    this.getCategoryUrl = 'http://localhost:8080/advertisement/category';
    this.postCategoryUrl = 'http://localhost:8080/category';
    this.usersProductsUrl = 'http://localhost:8080/myproducts';
    this.favouriteUrl = 'http://localhost:8080/favourite';
    this.updateProductUrl = 'http://localhost:8080/updateproduct';
    this.deleteProductUrl = 'http://localhost:8080/deleteproduct';
    this.editProductUrl = 'http://localhost:8080/editproduct';
    this.feedbackUrl = 'http://localhost:8080/feedback';
    this.deleteFeedbackUrl = 'http://localhost:8080/deletefeedback';
    this.removeFavoriteUrl = 'http://localhost:8080/removefavourite';
    this.postKindOfCategoryUrl = 'http://localhost:8080/createcategory';
    this.getKindOfCategoryUrl = 'http://localhost:8080/getallcategories';
    this.getProductsByCategoryUrl = 'http://localhost:8080/getcategoryinformation';
    this.postProductsByCategoryUrl = 'http://localhost:8080/postcategoryinformation';
    this.getImageUrl = 'http://localhost:8080/get/image/info/';
    this.getCategoryImageUrl = 'http://localhost:8080/get/categoryimage/info/';
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
  public editProduct(product: AllProducts) {
    return this.http.post<AllProducts>(this.editProductUrl, product);
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
    return this.http.post<AllProducts>(this.removeFavoriteUrl, {"id": product});
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
  public postKindOfCategory(category: Category) {
    return this.http.post<Category>(this.postKindOfCategoryUrl, category);
  }
  public getKindOfCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.getKindOfCategoryUrl);
  }

  public postProductsByCategory(category: number){
    return this.http.post<Category>(this.postProductsByCategoryUrl, { "id": category});
  }

  public getProductsByCategory(): Observable<AllProducts[]> {
    return this.http.get<AllProducts[]>(this.getProductsByCategoryUrl);
  }

  getImage(id: number) {
    return this.http.get(this.getImageUrl + id);
  }

  getCategoryImage(id: number) {
    return this.http.get(this.getCategoryImageUrl + id);
  }
}
