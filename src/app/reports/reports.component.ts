import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
    };
    public barChartLabels: string[] = [];
    public barChartData: any[] = [{data: [], label: 'Customers'}];

    public pieChartLabels: string[] = ['Male', 'Female'];
    public pieChartData: number[] = [300, 500];

    strErrorMsg = '';
    aCustomers: ICustomer[] = [];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomers().subscribe(
            aCustomers => {
                this.aCustomers = aCustomers;
                this.aCustomers.pop();

                const json = aCustomers;
                const aBarLabels = [];
                const aPieLabels = ['Male', 'Female'];
                const aPieData = [0, 0];
                for (let i = 0; i < json.length; i++) {
                    aPieData[aPieLabels.indexOf(json[i].fGender)] += 1;
                    if (aBarLabels.indexOf(json[i].fCountry) < 0) {
                        aBarLabels.push(json[i].fCountry);
                    }
                }
                aBarLabels.sort();
                const aBarData = [];
                for (let i = 0; i < aBarLabels.length; i++) {
                    aBarData.push(0);
                }
                for (let i = 0; i < json.length; i++) {
                    aBarData[aBarLabels.indexOf(json[i].fCountry)] += 1;
                }

                // jsonDataPie.datasets[0].data = aPieData;
                this.barChartLabels.length = 0;
                this.barChartLabels.push(...aBarLabels);

                const barChartData = JSON.parse(JSON.stringify(this.barChartData));
                barChartData[0].data = aBarData;
                this.barChartData = barChartData;

                this.pieChartData = aPieData;
            },
            error => this.strErrorMsg = <any>error
        );
    }

}
