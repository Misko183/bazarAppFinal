import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './security/authentication.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from "./registration/registration.component";
import {DisableLoginGuard} from "./security/disable-login.guard";
import {TestComponent} from "./test/test.component";
import {AllProductsComponent} from "./all-products/all-products.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},

  // {path: '', canActivate:[AuthenticationGuard], children: [
    { path: '', component: HomeComponent },
    // { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent,
      // canActivate: [DisableLoginGuard]
    },
  { path: 'test', component: TestComponent },
    { path: 'login', component: LoginComponent,
      canActivate: [DisableLoginGuard]
    },
    // { path: '**', redirectTo: 'login', pathMatch: 'full' },
  // ]}
  { path: 'allAdvertisements', component: AllProductsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
