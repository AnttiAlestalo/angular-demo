import { Component, OnInit } from '@angular/core';
import { ICustomer1 } from '../customer1';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-readcustomer',
    templateUrl: './readcustomer.component.html',
    styleUrls: ['./readcustomer.component.css']
})

export class ReadcustomerComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private router: Router,
                private customerService: CustomerService) {
    }

    errorMessage = '';
    jsonCustomer: ICustomer1 | undefined;

    ngOnInit() {
        const strId = this.route.snapshot.paramMap.get('id');
        this.getCustomer(strId);
    }

    getCustomer(id: string) {
        this.customerService.getCustomer(id).subscribe(
            customer => this.jsonCustomer = customer,
            error => this.errorMessage = <any>error);
    }

    jsEditCustomer(strId): void {
        this.router.navigate(['/editcustomer/' + strId]);
    }

}
