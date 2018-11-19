import { Injectable } from '@angular/core';
import { ICustomer } from './customers/customer';
import { IReadCustomer } from './readcustomer/readcustomer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    const strUrl = window.location.href.indexOf('localhost') > 0 ? 'api/customers.json' : '';
    return this.http.get<ICustomer[]>(strUrl).pipe(
      tap(data => console.log('Get: ' + strUrl)),
      catchError(this.handleError)
    );
  }

  getCustomer(strId): Observable<IReadCustomer> {
    const strUrl = window.location.href.indexOf('localhost') > 0 ? 'api/123.json' : 'http://www.aad.fi/aad/react1.nsf/vwCustomer/' + strId + '?OpenDocument&' + Date.now();
    return this.http.get<IReadCustomer>(strUrl).pipe(
      tap(data => console.log('Get: ' + strUrl)),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let strErrorMsg = '';
    if (err.error instanceof ErrorEvent) {
      strErrorMsg = `An error occurred: ${err.error.message}`;
    } else {
      strErrorMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(strErrorMsg);
    return throwError(strErrorMsg);
  }
}
