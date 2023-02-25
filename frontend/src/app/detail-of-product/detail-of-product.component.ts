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
    this.viewImageAnother();
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

  dbImages : any = [];
  postResponse2: any;

  viewImageAnother() {
    this.mainService.getAllProducts().subscribe(data => {
      this.oneProcust  = data.find(product => product.id === this.detailID);

      this.httpClient.get('http://localhost:8080/get/images/info/' + this.oneProcust.image.id)
        .subscribe(
          res => {
            this.postResponse2 = res;
            for (let i = 0; i < this.postResponse2.length; i++ ){
            this.dbImages[i] = 'data:image/jpeg;base64,' + this.postResponse2[i].image;
           console.log(this.dbImages)
          }
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



  deleteProduct() {
    this.mainService.deleteProduct(this.allProducts).subscribe(() => {
      this.router.navigate(['/allAdvertisements']);
    } );
  }


  token: any = sessionStorage.getItem('token');

  isAdmin(): boolean{
    if(this.authServiceSecurtiy.getAuthority())
    {return true;}
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  currentImage: any;

  openModal2(id: string, image: any) {
    this.modalService.open(id);
    this.currentImage = image;
  }

  closeModal(id: string) {
    this.modalService.close(id);

  }
}
