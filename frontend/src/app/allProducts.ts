import {User} from "./user";
import {Image} from "./image";

export class AllProducts {
  id?: number;
  name?: string;
  description?: string;
  price?: string;
  localization?: string;
  category?: string;
  image?: Image;
  user?: User;
  countClicksOnProduct?: number;
  array: number = 0;
}
