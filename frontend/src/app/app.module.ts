import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RequestInterceptor } from './security/request.interceptor';
import { RegistrationComponent } from './registration/registration.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { TestComponent } from './test/test.component';
import {AllProductsComponent} from "./all-products/all-products.component";
import {MatButtonModule} from "@angular/material/button";
import {DetailOfProductComponent} from "./detail-of-product/detail-of-product.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {UsersProductsComponent} from "./users-products/users-products.component";
import {ModalModule} from "./modal";
import {UsersProfileComponent} from "./users-profile/users-profile.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    TestComponent,
    AllProductsComponent,
    DetailOfProductComponent,
    AddProductComponent,
    UsersProductsComponent,
    UsersProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
