import {MainService} from "./services/mainService";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "./user";
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


}
