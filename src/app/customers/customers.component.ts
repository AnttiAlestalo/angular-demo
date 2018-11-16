import { Component, OnInit } from '@angular/core';
import { ICustomer } from './customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  errorMessage = '';
  constructor(private customerService: CustomerService) {

  }
  aCustomers: ICustomer[] = [];

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      customers => {
        this.aCustomers = customers;
      },
      error => this.errorMessage = <any>error
    );
  }
}
