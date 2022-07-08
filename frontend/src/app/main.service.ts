import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllProducts} from "./allProducts";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private getAllProductsUrl: string;
  private addProductUrl: string;

  constructor(private http: HttpClient) {
    this.getAllProductsUrl = 'http://localhost:8080/tovar';
    this.addProductUrl = 'http://localhost:8080/tovar';
  }

  public getAllProducts(): Observable<AllProducts[]> {
    return this.http.get<AllProducts[]>(this.getAllProductsUrl);
  }
  public addProduct(product: AllProducts) {
    return this.http.post<AllProducts>(this.addProductUrl, product);
  }

}
