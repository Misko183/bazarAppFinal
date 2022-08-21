import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainPageComponent } from './main-page/main-page.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { AllProductsComponent } from './all-products/all-products.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import { AddProductComponent } from './add-product/add-product.component';
import { ImageComponent } from './image/image.component';
import {MatSelectModule} from "@angular/material/select";
import {DetailOfProductComponent} from './detail-of-product/detail-of-product.component';
import {LoginComponent} from "./component/login/login.component";
import {AuthInterceptor} from "./security/interceptor/auth.interceptor";
import {UserService} from "./user/user.service";
import { RegistrationComponent } from './registration/registration.component';
import { UsersProductsComponent } from './users-products/users-products.component';
import { DetailOfCatagoryComponent } from './detail-of-catagory/detail-of-catagory.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AllProductsComponent,
    AddProductComponent,
    ImageComponent,
    DetailOfProductComponent,
    LoginComponent,
    RegistrationComponent,
    UsersProductsComponent,
    DetailOfCatagoryComponent,
    FavouriteComponent,
    FeedbackComponent,
    UsersProfileComponent,
    EditUserComponent

  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatSelectModule
    ],
  providers: [
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
