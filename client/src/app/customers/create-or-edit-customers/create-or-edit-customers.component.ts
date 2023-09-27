import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustomerInfor } from 'src/_models/customer_infor';
import { Customeri4Service } from 'src/_services/customeri4.service';

@Component({
  selector: 'app-create-or-edit-customers',
  templateUrl: './create-or-edit-customers.component.html',
  styleUrls: ['./create-or-edit-customers.component.css']
})
export class CreateOrEditCustomersComponent implements OnInit {
  @Input() dataDetail: CustomerInfor;
  data: CustomerInfor;
  dateNow: Date;
  listClass: {value: string, label: string}[] = [];
  regEmail = /^\w+@[a-zA-Z]+\.com$/i;
  regPhoneNumber = /^[0 || +84]+(?=.*[0-9]).{9}$/;;


  constructor(private _service: Customeri4Service) { }
  ngOnInit(): void {
    this.listClass = [];
    this.listClass.push({
      value: "Normal",
      label: "Normal"
    })
    this.listClass.push({
      value: "VIP",
      label: "VIP"
    })
    this.reset();
    if (this.dataDetail) {
      this.data = this.dataDetail;
    }
  }

  createOrEditCusI4(data: CustomerInfor) {
    if (data.name == '') {
      alert("The name field cannot be left blank")
      return;
    }
    if (data.email == '' || data.phoneNumber == '') {
      alert("The email or phone number field cannot be left blank")
      return;
    }
    if (!this.regEmail.test(data.email)) {
      alert("The email field is not valid!")
      return;
    }
    if (!this.regPhoneNumber.test(data.phoneNumber)) {
      alert("The phone number field is not valid!")
      return;
    }
    if (data.classCustomer == null || data.classCustomer == '') {
      data.classCustomer = 'Normal';
    }
    if (data.id == 0) {
      this._service.createCustomerI4(data).subscribe(res => {
        alert("Create Success!");
        this.dataDetail = null;
      });
    }
    else {
      this._service.editCustomerI4(data).subscribe(res => {
        alert("Update Success!");
        this.dataDetail = null;
      },
      error =>{
        alert("Email or PhoneNumber was used!")
      })
    }
  }

  reset() {
    this.data = {
      id: 0,
      name: '',
      age: 0,
      phoneNumber: '',
      email: '',
      address: '',
      creationTime: undefined,
      classCustomer: '',
      imageBase64: '',
      dayOfBirth: new Date()
    }
  }

  onselectionFile(file){
    var reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onloadend = (value) => {
      this.data.imageBase64 = value.target.result.toString();
    }
  }
}
