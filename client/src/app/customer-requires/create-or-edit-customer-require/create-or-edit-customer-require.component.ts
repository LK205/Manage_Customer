import { Component, Input, OnInit } from '@angular/core';
import { CustomerRequire } from 'src/_models/customer_require';
import { CustomerRequireService } from 'src/_services/customer-require.service';
import { Customeri4Service } from 'src/_services/customeri4.service';

@Component({
  selector: 'app-create-or-edit-customer-require',
  templateUrl: './create-or-edit-customer-require.component.html',
  styleUrls: ['./create-or-edit-customer-require.component.css']
})
export class CreateOrEditCustomerRequireComponent implements OnInit {
  @Input() dataDetail: CustomerRequire;
  data: CustomerRequire;
  list : {value: number, label: string}[] = [];
  listStatus : {value: string, label: string}[] = [];
  constructor(private _service: CustomerRequireService, private _serviceCus: Customeri4Service) { }
  ngOnInit(): void {
    this.list = [];
    this.listStatus = [];
    this._serviceCus.getAll('',0,1000).subscribe(res =>{
      res.forEach( r => {
        this.list.push({
          label: r.name,
          value: r.id
        })
      })
    });

    this.listStatus.push({value: "Đang chờ", label: "Đang chờ"});
    this.listStatus.push({value: "Đang xử lý", label: "Đang xử lý"});
    this.listStatus.push({value: "Đã xong", label: "Đã xong"});
    this.listStatus.push({value: "Bị từ chối", label: "Bị từ chối"});
    this.reset();
    if (this.dataDetail) {
      this.data = this.dataDetail;
    }
  }

  createOrEditCusI4(data: CustomerRequire) {
    if (data.title == '') {
      alert("The title field cannot be left blank")
      return;
    }
    if (data.description == '') {
      alert("The description or phone number field cannot be left blank")
      return;
    }
    if (data.customerId == null || data.customerId == 0) {
      alert("You must chose the customer require fiel!")
      return;
    }

    if(data.status == "" ){
      data.status = "Đang chờ";
    }
    if (data.id == 0) {
      this._service.createCustomerRequire(data).subscribe(res => {
        alert("Create Success!");
        this.dataDetail = null;
      });
    }
    else {
      this._service.editCustomerRequire(data).subscribe(res => {
        alert("Update Success!");
        this.dataDetail = null;
      })
    }
  }

  reset() {
    this.data = {
      id: 0,
      customerId: 0,
      title: "",
      description: "",
      status: "Chờ xác nhận",
      customerName: ""
    }
  }

}
