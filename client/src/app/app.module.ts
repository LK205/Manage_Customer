import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerRequiresComponent } from './customer-requires/customer-requires.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateOrEditCustomersComponent } from './customers/create-or-edit-customers/create-or-edit-customers.component';
import { CreateOrEditCustomerRequireComponent } from './customer-requires/create-or-edit-customer-require/create-or-edit-customer-require.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CustomersComponent,
    CustomerRequiresComponent,
    CreateOrEditCustomersComponent,
    CreateOrEditCustomerRequireComponent,
    CustomerDetailsComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),

  ],
  exports:[
    BsDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
