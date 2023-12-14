import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { MangeAccountComponent } from './mange-account/mange-account.component';
import { ManageCustomerSupportComponent } from './manage-customer-support/manage-customer-support.component';
import { InfomationAccountComponent } from './infomation-account/infomation-account.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'CustomerSupport', component: CustomerSupportComponent},
  {path: 'CustomerReport', component: CustomerReportComponent},
  {path: 'ManageAccount', component: MangeAccountComponent},
  {path: 'ManageCustomerRequire', component: ManageCustomerSupportComponent},
  {path: 'Account', component: InfomationAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
