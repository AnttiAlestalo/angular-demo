import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ReportsComponent } from './reports/reports.component';
import { ReadcustomerComponent} from './readcustomer/readcustomer.component';
import { EditcustomerComponent} from './editcustomer/editcustomer.component';

const routes: Routes = [
    {path: 'index.html', component: HomeComponent},
    {path: 'customers', component: CustomersComponent},
    {path: 'readcustomer/:id', component: ReadcustomerComponent},
    {path: 'editcustomer/:id', component: EditcustomerComponent},
    {path: 'reports', component: ReportsComponent},
    {path: '', redirectTo: 'index.html', pathMatch: 'full'},
    {path: '**', redirectTo: 'index.html', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
