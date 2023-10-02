import { Component, OnInit } from '@angular/core';
import { CustomerRequire } from 'src/_models/customer_require';
import { CustomerRequireService } from 'src/_services/customer-require.service';

@Component({
  selector: 'app-customer-requires',
  templateUrl: './customer-requires.component.html',
  styleUrls: ['./customer-requires.component.css']
})
export class CustomerRequiresComponent implements OnInit {
  status: string = "";

  titleModal: string;
  currentDate: Date = new Date();
  listCustomerRequire: CustomerRequire[];
  dataDetail: CustomerRequire;
  isDetails: boolean = false;
  cusId: number;
  
  constructor(private _service: CustomerRequireService) { }


  isCreateOrEdit: boolean = false;
  ngOnInit(): void {
    this.search();
  }

  search() {
    this._service.getAll(this.status).subscribe(data => {
      this.listCustomerRequire = data;
    });
  }

  deleteCusI4(id: number) {
    if (confirm("Are you sure?")) {
      this._service.deleteCustomerRequire(id).subscribe(res => {
        alert("Delete Success!");
        this.search();
      })
    }
  }

  editDataDetails(data?: CustomerRequire) {
    this.titleModal = !data ? "Add Customer Require" : "Edit Customer Require";
    if (data != null || data != undefined) {
      this.dataDetail = data;
    }
    this.isCreateOrEdit = true;
  }



  closeModalCreateOrEdit() {
    this.dataDetail = {
      id: 0,
      customerId: 1,
      title: "",
      description: "",
      status: "Chờ xác nhận",
      customerName: "",
      phoneNumber: "" 
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
