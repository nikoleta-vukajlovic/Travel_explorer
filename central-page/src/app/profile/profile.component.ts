import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Destination } from '../destination';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = '';
  favourites = [];
  constructor(public loginer: LoginService, private http: HttpClient) {
    this.username = loginer.username;
    this.favourites = loginer.favourites;
   }

  ngOnInit(): void {

  }
  removeDestination(d: Destination){

    const newLocation = d.location.replace(/ /g, '_');
    const REST_API_SERVER = 'http://localhost:3000/api/usersRoutes/delete/' + this.username + '/' +  newLocation + '/';
    this.favourites = this.favourites.filter(item => item !== d);

    this.http.delete(REST_API_SERVER).subscribe(
      (val) => {

          console.log('POST call successful value returned in body',
                      val);

      },
      response => {
          console.log('POST call in error', response);


      },
      () => {
          console.log('The POST observable is now completed.');
      });



  }
}
