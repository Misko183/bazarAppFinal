import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllProducts} from "./allProducts";
import {User} from "./user/user";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private getAllProductsUrl: string;
  private addProductUrl: string;
  private getCategoryUrl: string;
  private postCategoryUrl: string;
  private sendUser: string;


  constructor(private http: HttpClient) {
    this.getAllProductsUrl = 'http://localhost:8080/tovar';
    this.addProductUrl = 'http://localhost:8080/tovar';
    this.getCategoryUrl = 'http://localhost:8080/inzeraty/category';
    this.postCategoryUrl = 'http://localhost:8080/category';
    this.sendUser = 'http://localhost:8080/role';
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
  public getUsersRole(): Observable<string> {
    return this.http.get<string>(this.sendUser);
  }

}
