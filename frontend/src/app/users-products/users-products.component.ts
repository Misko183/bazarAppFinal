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
    private httpClient: HttpClient,
  )
  {
    this.detailID = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.mainService.getUsersProducts().subscribe(data => {
      this.allProducts = data;
      this.hopeFinal();
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

  luckyBool: boolean = false;

  editProduct(id: number) {

    this.allProducts1 = this.allProducts.find(product => product.id === id);
    this.luckyBool = true;
    this.openModal('custom-modal-1');


  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);

  }
check: boolean = false;

  editUser(): void {
    this.mainService.editProduct(this.allProducts1).subscribe(
      () => {
        this.check = true;
        setTimeout(() => {
          this.check = false;
          // this.logout();
          this.router.navigate(['/myproducts']);
        }, 3000);

      }
    );
  }

  selectedCategory: any;


  chooseCategory() {
    if (this.selectedCategory === 'Electronic') {
      this.allProducts1.category = 'Electronic';
    } else if (this.selectedCategory === 'Garden') {
      this.allProducts1.category = 'Garden';
    } else if (this.selectedCategory === 'Vehicles') {
      this.allProducts1.category = 'Vehicles';
    } else if (this.selectedCategory === 'Toys') {
      this.allProducts1.category = 'Toys';
    } else if (this.selectedCategory === 'Clothes') {
      this.allProducts1.category = 'Clothes';
    } else if (this.selectedCategory === 'Pets') {
      this.allProducts1.category = 'Pets';
    } else if (this.selectedCategory === 'Sport') {
      this.allProducts1.category = 'Sport';
    } else if (this.selectedCategory === 'House') {
      this.allProducts1.category = 'House';
    } else if (this.selectedCategory === 'HomeElectronics') {
      this.allProducts1.category = 'HomeElectronics';
    } else if (this.selectedCategory === 'Furniture') {
      this.allProducts1.category = 'Furniture';
    }
  }


  uploadedImage: File;
  postResponse: any;
  successResponse: string;


  public onImageUpload({event}: { event: any }) {
    this.uploadedImage = event.target.files[0];
  }

  createAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    imageFormData.append('id', this.allProducts1.image.id.toString());




    this.httpClient.post('http://localhost:8080/changeImage', imageFormData ,{ observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.postResponse = response;
            this.successResponse = this.postResponse.body.message;
          } else {
            this.successResponse = 'Image not uploaded due to some error!';
          }


        }
      );
  }






findProduct() {
  this.mainService.getAllProducts().subscribe(data => {
    this.allProducts1 = data.find(product => product.id === this.detailID);
  });
}


  postResponseF: any;
  dbImageF : Array<any> = [];

  hopeFinal() {
    this.httpClient.get('http://localhost:8080/getusersproductimages')
      .subscribe(
        res => {
          this.postResponseF = res;
          for(let image of this.postResponseF){
            this.dbImageF.push('data:image/jpeg;base64,' + image.image);
          }
        }
      );
  }
}
