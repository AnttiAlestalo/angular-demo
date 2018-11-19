import { Component, OnInit } from '@angular/core';
import { ICustomer } from './customer';
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

  errorMessage = '';
  aCustomers: ICustomer[] = [];

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      customers => {
        this.aCustomers = customers;
        this.aCustomers.pop();
      },
      error => this.errorMessage = <any>error
    );
  }

  jsReadCustomer(strId): void {
    this.router.navigate(['/readcustomer/' + strId]);
  }

}
