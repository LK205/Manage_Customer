import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRequiresComponent } from './customer-requires/customer-requires.component';

const routes: Routes = [
  {path:'customer', component: CustomersComponent},
  {path:'require', component: CustomerRequiresComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
