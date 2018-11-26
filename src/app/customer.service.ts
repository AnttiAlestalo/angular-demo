import { Injectable } from '@angular/core';
import { ICustomer } from './customer';
import { ICustomer1 } from './customer1';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    constructor(private http: HttpClient) { }

    getCustomers(): Observable<ICustomer[]> {
        const strUrl = window.location.href.indexOf('localhost') > 0 ? 'api/customers.json' : 'http://www.aad.fi/aad/react1.nsf/vwCustomers?OpenView&' + Date.now();
        return this.http.get<ICustomer[]>(strUrl).pipe(
            tap(data => console.log('Get: ' + strUrl)),
            catchError(this.handleError)
        );
    }

    getCustomer(strId) {
        const strUrl = window.location.href.indexOf('localhost') > 0 ? 'api/123.json' : 'http://www.aad.fi/aad/react1.nsf/vwCustomer/' + strId + '?OpenDocument&' + Date.now();
        return this.http.get<ICustomer1>(strUrl).pipe(
            tap(data => console.log('Get: ' + strUrl)),
            catchError(this.handleError)
        );
    }

    saveCustomer(jsonCustomer: ICustomer): Observable<ICustomer> {
        const strUrl = (jsonCustomer.id === undefined ? 'http://www.aad.fi/aad/react1.nsf/frmCustomer?CreateDocument' : 'http://www.aad.fi/aad/react1.nsf/0/' + jsonCustomer.id + '?SaveDocument');

        const strUrlParam = Object.keys(jsonCustomer).map(function(strKey) {
            return encodeURIComponent(strKey) + '=' + encodeURIComponent(jsonCustomer[strKey] === undefined ? '' : jsonCustomer[strKey]);
        }).join('&');

        // @ts-ignore
        return this.http.post<ICustomer>(strUrl, strUrlParam, {responseType: 'text'})
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteCustomer(strId) {
        const strUrl = 'http://www.aad.fi/aad/react1.nsf/vwCustomers/' + strId + '?DeleteDocument&' + Date.now();
        // @ts-ignore
        return this.http.get<ICustomer1>(strUrl, {responseType: 'text'}).pipe(
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
