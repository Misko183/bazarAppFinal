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
import { VehiclesComponent } from './category/vehicles/vehicles.component';
import { GardenComponent } from './category/garden/garden.component';
import { ElectronicComponent } from './category/electronic/electronic.component';
import { ImageComponent } from './image/image.component';
import {MatSelectModule} from "@angular/material/select";
import {DetailOfProductComponent} from './detail-of-product/detail-of-product.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AllProductsComponent,
    AddProductComponent,
    VehiclesComponent,
    GardenComponent,
    ElectronicComponent,
    ImageComponent,
    DetailOfProductComponent,

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
