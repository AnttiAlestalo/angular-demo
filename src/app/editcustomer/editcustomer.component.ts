import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Customer } from './customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../popup/modal.service';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
    selector: 'app-editcustomer',
    templateUrl: './editcustomer.component.html',
    styleUrls: ['./editcustomer.component.css']
})

export class EditcustomerComponent implements OnInit {

    options: DatepickerOptions = {
        minYear: 1970,
        maxYear: 2030,
        displayFormat: 'DD.MM.YYYY',
        barTitleFormat: 'DD.MM.YYYY',
        dayNamesFormat: 'dd',
        firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
        minDate: new Date(Date.now()), // Minimal selectable date
        maxDate: new Date(Date.now()),  // Maximal selectable date
        barTitleIfEmpty: 'Click to select a date',
        placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
        addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
        addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
        fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
        useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
    };

    constructor(
        private _location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
        private modalService: ModalService
        ) { }

    errorMessage = '';
    jsonCountries = [];
    // @ts-ignore
    jsonCustomer = new Customer();

    ngOnInit() {
        this.customerService.getCountries().subscribe(
            aCountries => this.jsonCountries = aCountries,
            error => this.errorMessage = <any>error);

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
            this.modalService.open('idPopup1');
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
