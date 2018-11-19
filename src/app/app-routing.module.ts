import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ReportsComponent } from './reports/reports.component';
import { ReadcustomerComponent} from './readcustomer/readcustomer.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'readcustomer/:id', component: ReadcustomerComponent},
  {path: 'reports', component: ReportsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
