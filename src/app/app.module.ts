import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgDatepickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ReportsComponent } from './reports/reports.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { ReadcustomerComponent } from './readcustomer/readcustomer.component';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { ModalComponent } from './popup/modal.component';

import { ModalService } from './popup/modal.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CustomersComponent,
        ReportsComponent,
        AppheaderComponent,
        ReadcustomerComponent,
        EditcustomerComponent,
        ModalComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        NgSelectModule,
        AngularFontAwesomeModule,
        ChartsModule,
        NgDatepickerModule,
    ],
    providers: [ModalService],
    bootstrap: [AppComponent]
})
export class AppModule { }
