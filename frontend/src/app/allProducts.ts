import {MainService} from "./main.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "./user/user";
import {Image} from "./image";

export class AllProducts {
  id: number;
  name: string;
  description: string;
  price: string;
  localization: string;
  category: string;
  image: Image;
  user: User;
  countClicksOnProduct: number;
  array: number = 0;
 //  detailID: number;
 //  postResponse: any;
 //  dbImage: any;
 //
 //  constructor(
 //    private mainService: MainService,
 //    private route: ActivatedRoute,
 //    private router: Router,
 //    private httpClient: HttpClient,
 //  ) {
 //    this.detailID = +this.route.snapshot.paramMap.get('id');
 //  }
 //   OnInit(): void {
 //  this.viewImage();
 //  }
 // oneProcust: AllProducts;
 //
 //
 //  viewImage() {
 //
 //      this.httpClient.get('http://localhost:8080/get/image/info/3')
 //        .subscribe(
 //          res => {
 //            this.postResponse = res;
 //            this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
 //          }
 //        );
 //
 //  }
 //

}
