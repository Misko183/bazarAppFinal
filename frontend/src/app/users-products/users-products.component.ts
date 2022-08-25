import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {AllProducts} from "../allProducts";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../security/service/auth.service";
import {ModalService} from "../modal";

@Component({
  selector: 'app-users-products',
  templateUrl: './users-products.component.html',
  styleUrls: ['./users-products.component.css'],
})
export class UsersProductsComponent implements OnInit {

  allProducts: AllProducts[];
  allProducts1: AllProducts;
 detailID: number;
bool: boolean = false;
all: AllProducts;

setbool(){
  this.bool = true;
}

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalService: ModalService,
  )
  {
    this.detailID = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.mainService.getUsersProducts().subscribe(data => {
      this.allProducts = data;
    });

  }
  deleteProduct(id: number) {
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts1 = data.find(product => product.id === id);
    this.mainService.deleteProduct(this.allProducts1).subscribe(() => {
      this.router.navigate(['/home']);
    } );
    } );
  }

  isSomeoneLogIn() {
    return this.authService.isSomeoneLoggedIn;
  }

  editProduct(id: number) {

    this.allProducts1 = this.allProducts.find(product => product.id === id);
   // this.router.navigate(['/editproduct', id]);

  }

  // openModal(id: string) {
  //   this.modalService.open(id);
  // }
  //
  // closeModal(id: string) {
  //   this.modalService.close(id);
  //
  // }
findProduct() {
  this.mainService.getAllProducts().subscribe(data => {
    this.allProducts1 = data.find(product => product.id === this.detailID);
  });
}

// findme(id: number) {
//   this.mainService.getUsersProducts().subscribe(data => {
//     this.all= data.find(product => product.id === id);
//       this.bool = true;
//   }
//   );
// }
}
