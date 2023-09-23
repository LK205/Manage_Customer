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
  cusClass: string = "";
  listCustomer: CustomerInfor[] = [];
  titleModal: string;
  dataDetail : CustomerInfor;
  currentDate: Date = new Date();
  constructor (private _service: Customeri4Service){}
  isCreateOrEdit: boolean = false;
  isDetails: boolean = false;
  cusId: number;

  ngOnInit(): void {
    this.search();
  }

  search(){
     this._service.getAll(this.request, this.fromAge, this.toAge, this.cusClass).subscribe(data =>{
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

  createOrEditCus(data?: CustomerInfor){
    this.titleModal = !data ? "Add Customer" : "Edit Customer";
    if(data != null || data != undefined){
      this.dataDetail = data;
    }
    this.isCreateOrEdit = true;
  }



  closeModalCreateOrEdit(){
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
    this.isCreateOrEdit = false;
  }

  showModalDetails(id: number){
    this.cusId = id;
    this.isDetails= true;
  }

  closeModalDetails(){
    this.isDetails= false;
  }
}
