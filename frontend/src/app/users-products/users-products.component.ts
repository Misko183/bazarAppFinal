import { Component, OnInit } from '@angular/core';
import {MainService} from "../services/mainService";
import {AllProducts} from "../allProducts";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/userService";
import {ModalService} from "../modal";
import {Category} from "../category";

@Component({
  selector: 'app-users-products',
  templateUrl: './users-products.component.html',
  styleUrls: ['./users-products.component.css'],
})
export class UsersProductsComponent implements OnInit {

  allProducts: AllProducts[];
  allProducts1: AllProducts;
 detailID: number;
 dbImage: any;
bool: boolean = false;
all: AllProducts;

setbool(){
  this.bool = true;
}

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: UserService,
    private modalService: ModalService,
    private httpClient: HttpClient,
  )
  {
    this.detailID = +this.route.snapshot.paramMap.get('id');
    this.returnCategory();
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
        if (confirm('Určite chcete vymazať inzerát  '+this.allProducts1.name +'?')) {
          this.mainService.deleteProduct(this.allProducts1).subscribe(() => {
            this.ngOnInit();
          });
        }
      } );


  }
  token: any = sessionStorage.getItem('token');

  luckyBool: boolean = false;

  editProduct(id: number) {

    this.allProducts1 = this.allProducts.find(product => product.id === id);
    this.luckyBool = true;

    // this.viewImage();
    this.httpClient.get('http://localhost:8080/get/image/info/' + this.allProducts1.image.id)
      .subscribe(
        res => {
          this.postResponse = res;
          this.liveDemo = 'data:image/jpeg;base64,' + this.postResponse.image;
          this.openModal('custom-modal-1');
        }
      );

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



  returnCategory() {
    this.mainService.getKindOfCategory().forEach((category) => {
        this.categoryArray = category;

      }
    );

  }

  chooseCategory() {
    this.allProducts1.kindOfCategory = this.category;
  }
  categoryArray: Category[];
  category: any;
  uploadedImage: File;
  postResponse: any;
  successResponse: string;


  public onImageUpload({event}: { event: any }) {
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.liveDemo = e.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  liveDemo:any;

  createAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    imageFormData.append('id', this.allProducts1.image.id.toString());




    this.httpClient.post('http://localhost:8080/changeImage', imageFormData ,{ observe: 'response' })
      .subscribe((response) => {
        this.ngOnInit();

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
  dbImageId : Array<any> = [];

  hopeFinal() {
    this.httpClient.get('http://localhost:8080/getusersproductimages')
      .subscribe(
        res => {
          this.postResponseF = res;
          for (let i = 0; i < this.postResponseF.length; i++) {
            this.dbImageF[i] = 'data:image/jpeg;base64,' + this.postResponseF[i].image;
            this.dbImageId[i] = this.postResponseF[i].id;
          }

          for(let i = 0; i < this.dbImageId.length; i++){
            this.map.set(this.dbImageId[i], this.dbImageF[i]);
          }


        }
      );
  }

  map = new Map();

  returnGoodImage(number: number) {

    if (this.map.has(number)) {
      return this.map.get(number);
    }
  }
}
