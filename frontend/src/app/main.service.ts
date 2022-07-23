import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllProducts} from "./allProducts";
import {User} from "./user/user";
import {Favourite} from "./favourite";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private getAllProductsUrl: string;
  private addProductUrl: string;
  private getCategoryUrl: string;
  private postCategoryUrl: string;
  private sendUser: string;
  private usersProductsUrl: string;
  private favouriteUrl: string;

  constructor(private http: HttpClient) {
    this.getAllProductsUrl = 'http://localhost:8080/advertisement';
    this.addProductUrl = 'http://localhost:8080/advertisement';
    this.getCategoryUrl = 'http://localhost:8080/advertisement/category';
    this.postCategoryUrl = 'http://localhost:8080/category';
    this.sendUser = 'http://localhost:8080/role';
    this.usersProductsUrl = 'http://localhost:8080/myproducts';
    this.favouriteUrl = 'http://localhost:8080/favourite';
  }

  public getAllProducts(): Observable<AllProducts[]> {
    return this.http.get<AllProducts[]>(this.getAllProductsUrl);
  }
  public addProduct(product: AllProducts) {
    return this.http.post<AllProducts>(this.addProductUrl, product);
  }

  public getOneCategory(): Observable<AllProducts[]>{
    return this.http.get<AllProducts[]>(this.getCategoryUrl);
  }

  public postCategory(category: string) {
    return this.http.post<string>(this.postCategoryUrl, category);
  }
  public sendUserName(username: string) {
    return this.http.post<User>(this.sendUser, {"userName" : username});
  }
  public getUsersRole(): Observable<User> {
    return this.http.get<User>(this.sendUser);
  }

  public sendUserInfo(id: number) {
    return this.http.post<User>(this.usersProductsUrl, {"id" : id});
  }
  public getUsersProducts(): Observable<AllProducts[]> {
    return this.http.get<AllProducts[]>(this.usersProductsUrl);
  }
  public addToFavourite(product: number, user: number) {
    return this.http.post<Favourite>(this.favouriteUrl, {"product" :{ "id": product}, "user" : {"id": user}});
  }

}
