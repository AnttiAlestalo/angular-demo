import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService) {}

    _fSearch = '';
    get fSearch(): string {
        return this._fSearch;
    }
    set fSearch(value: string) {
        this._fSearch = value;
        this.aSearchCustomers = this.fSearch ? this.performSearch(this.fSearch) : this.aCustomers;
    }
    strErrorMsg = '';
    strSortBy = 'fName';
    bSortDes = false;
    aCustomers: ICustomer[] = [];
    aSearchCustomers: ICustomer[] = [];

    performSearch(strQ: string): ICustomer[] {
        strQ = strQ.toLocaleLowerCase();
        return this.aCustomers.filter((jsonCustomer: ICustomer) =>
            (jsonCustomer.fName.toLocaleLowerCase().indexOf(strQ) > -1) || (jsonCustomer.fEmail.toLocaleLowerCase().indexOf(strQ) > -1) || (jsonCustomer.fPhone.toLocaleLowerCase().indexOf(strQ) > -1) || (jsonCustomer.fCountry.toLocaleLowerCase().indexOf(strQ) > -1)
        );
    }

    ngOnInit() {
        this.customerService.getCustomers().subscribe(
            customers => {
                this.aCustomers = customers;
                this.aCustomers.pop();
                this.aCustomers.sort((a: any, b: any) => {
                    return a[this.strSortBy].localeCompare(b[this.strSortBy]);
                });
                this.aSearchCustomers = this.aCustomers;
            },
            error => this.strErrorMsg = <any>error
        );
    }

    jsSortBy(strSortBy) {
        this.bSortDes = (strSortBy === this.strSortBy ? !this.bSortDes : false);
        this.strSortBy = strSortBy;
        this.aCustomers.sort((a: any, b: any) => {
            return a[strSortBy].localeCompare(b[strSortBy]);
        });
        if (this.bSortDes) {
            this.aCustomers.reverse();
        }
    }

    jsReadCustomer(strId): void {
        this.router.navigate(['/readcustomer/' + strId]);
    }

    jsEditCustomer(strId): void {
        this.router.navigate(['/editcustomer/' + strId]);
    }

}
