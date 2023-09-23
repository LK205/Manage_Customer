import { Component, Input, OnInit } from '@angular/core';
import { CustomerInfor } from 'src/_models/customer_infor';
import { CustomerRequire } from 'src/_models/customer_require';
import { CustomerRequireService } from 'src/_services/customer-require.service';
import { Customeri4Service } from 'src/_services/customeri4.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{
  @Input() idCus: number;
  cusI4Data: CustomerInfor;
  cusRequireData: CustomerRequire[];

  constructor (private _serviceCus : Customeri4Service, private _serviceRequire: CustomerRequireService) {}
  ngOnInit(): void {
    this.getCusI4();
    this.getAllRequireById();
  }

  getCusI4(){
    this._serviceCus.getById(this.idCus).subscribe( value =>{
      this.cusI4Data = value;
    })
  }

  getAllRequireById(){
    this._serviceRequire.getAllById(this.idCus).subscribe(value => {
      this.cusRequireData = value;
    })
  }
}
