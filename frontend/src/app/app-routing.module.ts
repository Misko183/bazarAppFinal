import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AllProductsComponent} from "./all-products/all-products.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {ImageComponent} from "./image/image.component";
import {DetailOfProductComponent} from "./detail-of-product/detail-of-product.component";
import {LoginComponent} from "./component/login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UsersProductsComponent} from "./users-products/users-products.component";
import {DetailOfCatagoryComponent} from "./detail-of-catagory/detail-of-catagory.component";
import {FavouriteComponent} from "./favourite/favourite.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {UsersProfileComponent} from "./users-profile/users-profile.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: MainPageComponent},
  {path: 'allproducts', component: AllProductsComponent},
  {path: 'createproduct', component: AddProductComponent},
  {path: 'image', component: ImageComponent},
  {path: 'detail/:id', component: DetailOfProductComponent},
  {path: 'login', component: LoginComponent },
  {path: 'registration', component: RegistrationComponent},
  {path: 'myproducts', component: UsersProductsComponent},
  {path: 'detailcatagory', component: DetailOfCatagoryComponent},
  {path: 'myfavourite', component: FavouriteComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'profile', component: UsersProfileComponent},
  {path: 'editprofile', component: EditUserComponent},
  {path: 'editproduct', component: EditProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
