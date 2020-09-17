import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ReceiverService } from '../receiver.service';
import { Observable } from 'rxjs';
import { Destination } from '../destination';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  i = 0;
  constructor(private receiver: ReceiverService, public loginer: LoginService, private http: HttpClient, public router: Router, public route: ActivatedRoute) {
    
  }
  dest: Destination[];
  clickedFav = [];
  specifiedLocation = '';
  ngOnInit(): void {
    this.dest = [];
    this.route.params.subscribe(params => {
      if (params.data !== undefined){
        this.specifiedLocation = params.data;
      }

  });
    this.dest = this.receiver.dest.filter(d => d.location.includes(this.specifiedLocation));;
    this.clickedFav.fill(false, 0, this.dest.length);
     
  }
  addFavourites(destFav: Destination): void{
      if (this.loginer.favourites.findIndex(d => d.location === destFav.location) >= 0){
        return;
      }
      this.loginer.favourites.push(destFav);
      const i  = this.dest.map((e) => e.location).indexOf(destFav.location);
      this.clickedFav[i] = true;
      this.delay(1000).then(() => {
        this.clickedFav[i] = false;
   });
      const newLocation = destFav.location.replace(/ /g, '_');
      const REST_API_SERVER = 'http://localhost:3000/api/usersRoutes/' + this.loginer.username + '/' + newLocation + '/';
      console.log(REST_API_SERVER);
      const data = {username: this.loginer.username, location: destFav.location};
      this.http.put(REST_API_SERVER, data).subscribe(
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
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
}
}
