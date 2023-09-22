import { Component, OnInit } from '@angular/core';
import { daLocale } from 'ngx-bootstrap/chronos';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';
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
  dataDetail : CustomerInfor;
  currentDate: Date = new Date();
  constructor (private _service: Customeri4Service){}
  

  Edit: boolean = false;
  ngOnInit(): void {
    this.search();
  }

  search(){
     this._service.getAll(this.request, this.fromAge, this.toAge).subscribe(data =>{
      this.listCustomer = data;
     }); 
  }

  deleteCusI4(id: number){
    if(confirm("Are you sure?")){
      this._service.deleteCustomerI4(id).subscribe(res => {
        alert("Delete Success!");
        this.search();
      })
    }
  }

  editDataDetails(data?: CustomerInfor){
    if(data != null || data != undefined){
      this.dataDetail = data;
    }
    this.Edit = true;
  }



  closeModal(){
    this.dataDetail = {
      id: 0,
      name: '',
      age: 0,
      phoneNumber: '',
      email: '',
      address: '',
      creationTime: this.currentDate,
      classCustomer: '',
      imageBase64: '',
      dayOfBirth:  this.currentDate
    }
    this.search();
    this.Edit = false;
  }
}
