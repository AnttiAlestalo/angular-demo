import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Customer } from './customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ICustomer} from '../customer';

@Component({
    selector: 'app-editcustomer',
    templateUrl: './editcustomer.component.html',
    styleUrls: ['./editcustomer.component.css']
})

export class EditcustomerComponent implements OnInit {
    constructor(
        private _location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService
        ) { }

    errorMessage = '';
    // @ts-ignore
    jsonCustomer = new Customer();

    ngOnInit() {
        const strId = this.route.snapshot.paramMap.get('id');
        if (strId !== '0') {
            this.getCustomer(strId);
        }
    }

    getCustomer(id: string) {
        this.customerService.getCustomer(id).subscribe(
            customer => this.jsonCustomer = customer,
            error => this.errorMessage = <any>error);
    }

    jsStrRight(str1: string, str2: string): string {
        if (str1 === undefined) { return ''; }
        const i = str1.lastIndexOf(str2);
        const iLen = str2.length;
        if (i < 0 || (i + iLen) === str1.length) {
            return '';
        } else {
            return str1.substring(i + iLen, str1.length);
        }
    }

    jsLeft(str: string, n: number): string {
        if (str === undefined || n <= 0) {
            return '';
        } else if (n > str.length) {
            return str;
        } else {
            return str.substring(0, n);
        }
    }

    jsSaveCustomer(jsonCustomerForm: NgForm) {
        if (jsonCustomerForm.form.invalid) {
            return;
        }

        this.customerService.saveCustomer(jsonCustomerForm.value).subscribe(
            strResponse => (
                this.jsReadCustomer(this.jsLeft(this.jsStrRight(JSON.stringify(strResponse), '^OK^'), 32))
            ),
            error => this.errorMessage = <any>error);
    }

    jsDeleteCustomer(strId): void {
        this.customerService.deleteCustomer(strId).subscribe(
            () => ( this.router.navigate(['/customers']) ),
            error => this.errorMessage = <any>error);
    }

    jsReadCustomer(strId): void {
        this.router.navigate(['/readcustomer/' + strId]);
    }

    jsCancel() {
        this._location.back();
    }

}
