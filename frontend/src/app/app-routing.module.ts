import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AllProductsComponent} from "./all-products/all-products.component";
import {AddProductComponent} from "./add-product/add-product.component";

const routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: MainPageComponent},
  {path: 'allproducts', component: AllProductsComponent},
  {path: 'createproduct', component: AddProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
