import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export abstract class HttpErrorHandler {
  constructor() {}

  protected handleError() {
    return (error: HttpErrorResponse): Observable<never> => {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    };
  }
}
