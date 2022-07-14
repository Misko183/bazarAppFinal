import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AllProductsComponent} from "./all-products/all-products.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {ElectronicComponent} from "./category/electronic/electronic.component";
import {GardenComponent} from "./category/garden/garden.component";
import {VehiclesComponent} from "./category/vehicles/vehicles.component";
import {ImageComponent} from "./image/image.component";
import {DatailOfProductComponent} from "./datail-of-product/datail-of-product.component";

const routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: MainPageComponent},
  {path: 'allproducts', component: AllProductsComponent},
  {path: 'createproduct', component: AddProductComponent},
  {path: 'electronic', component: ElectronicComponent},
  {path: 'garden', component: GardenComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'image', component: ImageComponent},
  {path: 'detail/:id', component: DatailOfProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
