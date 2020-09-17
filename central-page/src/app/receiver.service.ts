import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Destination } from './destination';
import {HttpErrorHandler} from './http-error-handler.model';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService extends HttpErrorHandler{
  [x: string]: any;
  public destinations: Observable<Destination[]>;
  public dest: Destination[];
  private readonly REST_API_SERVER = 'http://localhost:3000/api/usersRoutes/destinations/';
  constructor(private http: HttpClient, private router: Router) {
    super();
    this.dest = [];
    this.getDestinations();

  }

  getDestinations(): Observable<Destination[]>{
   this.dest = [];
   this.destinations = this.http.get<Destination[]>(this.REST_API_SERVER).pipe(catchError(super.handleError()));
   this.destinations.subscribe(data => data.forEach(d => this.dest.push(d)));
   return this.destinations;
  }
  callNavigate(dest: string){
    this.router.navigate(['/locations', { data: dest }]);
  }
}
