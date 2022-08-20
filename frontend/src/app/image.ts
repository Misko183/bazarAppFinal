import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

export class Image{

id: number;
type: string;
image: any;
postResponse0: any;
dbImage0: any;


constructor(
  private route: ActivatedRoute,
  private router: Router,
  private httpClient: HttpClient,
  ) {

}

// complet(num: number): any {
//   this.httpClient.get('http://localhost:8080/get/image/info/' + num)
//       .subscribe(
//         res => {
//           this.postResponse0 = res;
//       return     this.dbImage0 = 'data:image/jpeg;base64,' + this.postResponse0.image;
//         }
//       );
//   return this.dbImage0;
//   }
 }


// postResponse0: any;
// retImg: any;
//
// constructor(
//   private route: ActivatedRoute,
//   private router: Router,
//   private httpClient: HttpClient,
//   ) {
//  this.id = +this.route.snapshot.paramMap.get('id');
//
// }
//    OnInit(): void {
//   this.showImg();
//   }
//
//   showImg() {
//     this.httpClient.get('http://localhost:8080/get/image/info/' + this.id)
//       .subscribe(
//         res => {
//           this.postResponse0 = res;
//           this.image = 'data:image/jpeg;base64,' + this.postResponse0.image;
//         }
//       );
//   }

