import { Component, OnInit } from '@angular/core';
import { CustomerInfor } from 'src/_models/customer_infor';
import { Customeri4Service } from 'src/_services/customeri4.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  request: string | undefined;
  fromAge: number | undefined;
  toAge: number | undefined;
  listCustomer: CustomerInfor[] = [];
  constructor (private _service: Customeri4Service){}

  ngOnInit(): void {
    this.search();
    this.listCustomer.forEach(e => e.dayOfBirth.toLocaleDateString("en-US"))
  }

  search(){
     this._service.getAll(this.request, this.fromAge, this.toAge).subscribe(data =>{
      this.listCustomer = data;
      console.log(this.listCustomer);
     }); 
  }
}
