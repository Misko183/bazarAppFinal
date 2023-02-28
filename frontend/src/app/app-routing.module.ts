import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './security/authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from "./registration/registration.component";
import {DisableLoginGuard} from "./security/disable-login.guard";
import {TestComponent} from "./test/test.component";
import {AllProductsComponent} from "./all-products/all-products.component";
import {DetailOfProductComponent} from "./detail-of-product/detail-of-product.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {UsersProductsComponent} from "./users-products/users-products.component";
import {UsersProfileComponent} from "./users-profile/users-profile.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {FavouriteComponent} from "./favourite/favourite.component";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {DetailOfCatagoryComponent} from "./detail-of-catagory/detail-of-catagory.component";
import {RegistrationByEmailComponent} from "./registration-by-email/registration-by-email.component";
import {ConfirmVerificationComponent} from "./confirm-verification/confirm-verification.component";
import {CompareComponent} from "./compare/compare.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},

  // {path: '', canActivate:[AuthenticationGuard], children: [
    { path: '', component: HomeComponent },
    // { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent,
      // canActivate: [DisableLoginGuard]
    },
  { path: 'registrationByEmail', component: RegistrationByEmailComponent,
    // canActivate: [DisableLoginGuard]
  },
  { path: 'test', component: TestComponent },
    { path: 'login', component: LoginComponent,
      canActivate: [DisableLoginGuard]
    },
    // { path: '**', redirectTo: 'login', pathMatch: 'full' },
  // ]}
  { path: 'allAdvertisements', component: AllProductsComponent },
  {path: 'detail/:id', component: DetailOfProductComponent},
  {path: 'addAdvertisement', component: AddProductComponent},
  {path: 'usersAdvertisements', component: UsersProductsComponent},
  {path: 'usersProfile', component: UsersProfileComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'favourite', component: FavouriteComponent},
  {path: 'createCategory', component: CategoryFormComponent},
  {path: 'detailcatagory', component: DetailOfCatagoryComponent},
  {path: 'confirmVerification', component: ConfirmVerificationComponent},
  {path: 'compareOfProducts', component: CompareComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
