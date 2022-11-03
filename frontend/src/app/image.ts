import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

export class Image{

id?: number;
type?: string;
image: any;
postResponse0: any;
dbImage0: any;


constructor(
  private route: ActivatedRoute,
  private router: Router,
  private httpClient: HttpClient,
  ) {

}
 }

