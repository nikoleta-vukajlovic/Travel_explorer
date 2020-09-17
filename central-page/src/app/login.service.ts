import { Injectable } from '@angular/core';
import { Destination } from './destination';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logined = false;
  username = '';
  favourites: Destination[];
  constructor() {
    this.favourites = [];
   }
}
