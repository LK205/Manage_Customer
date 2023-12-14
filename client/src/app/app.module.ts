import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './home/home.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { MangeAccountComponent } from './mange-account/mange-account.component';
import { ManageCustomerSupportComponent } from './manage-customer-support/manage-customer-support.component';
import { InfomationAccountComponent } from './infomation-account/infomation-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    CustomerSupportComponent,
    CustomerReportComponent,
    MangeAccountComponent,
    ManageCustomerSupportComponent,
    InfomationAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),

  ],
  exports:[
    BsDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
