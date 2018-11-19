import { Component, OnInit } from '@angular/core';
import { IReadCustomer } from './readcustomer';
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
  jsonCustomer: IReadCustomer | undefined;

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCustomer(id);
    }
  }

  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      customer => this.jsonCustomer = customer,
      error => this.errorMessage = <any>error);
  }

}
