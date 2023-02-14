import { Component, OnInit } from '@angular/core';
import {AllProducts} from "../allProducts";
import {MainService} from "../services/mainService";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/userService";
import {ModalService} from "../modal";
import {AuthService} from "../security/authService";

@Component({
  selector: 'app-datail-of-product',
  templateUrl: './detail-of-product.component.html',
  styleUrls: ['./detail-of-product.component.css', './detailModal.less']
})
export class DetailOfProductComponent  implements OnInit {

  allProducts: AllProducts;
  oneProcust: AllProducts;
  detailID: number;
  dbImage: any;
  postResponse: any;

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private authService: UserService,
    private modalService: ModalService,
    private authServiceSecurtiy: AuthService,
  ) {
    this.detailID = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.findProduct();
    this.viewImage();
  }


  findProduct() {
    this.mainService.getAllProducts().subscribe(data => {
      this.allProducts = data.find(product => product.id === this.detailID);
      this.mainService.updateProduct(this.allProducts).subscribe();
    } );
  }

  viewImage() {
    this.mainService.getAllProducts().subscribe(data => {
      this.oneProcust  = data.find(product => product.id === this.detailID);

    this.httpClient.get('http://localhost:8080/get/image/info/' + this.oneProcust.image.id)
      .subscribe(
        res => {
          this.postResponse = res;
          this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
        }
      );
    });
  }

/* toto bolo*/
  addToFavourite() {
    this.mainService.addToFavourite(this.detailID, this.detailID).subscribe(data => {
      this.router.navigate(['/allAdvertisements']);
    } );
  }



  //findProductbyDeateilId() {
  //  this.mainService.getAllProducts().subscribe(data => {
  //    this.allProducts = data.find(product => product.id === this.detailID);


  deleteProduct() {
    this.mainService.deleteProduct(this.allProducts).subscribe(() => {
      this.router.navigate(['/allAdvertisements']);
    } );
  }

  // isAdminLoggedIn() {
  //   return this.authService.isAdminLoggedIn;
  // }
  //
  // isSomeoneLoggedIn() {
  //   return this.authService.isSomeoneLoggedIn;
  // }

  token: any = sessionStorage.getItem('token');

  isAdmin(): boolean{
    if(this.authServiceSecurtiy.getAuthority())
    {return true;}
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);

  }
}
