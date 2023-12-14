import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/_services/account.service';
import { CustomerRequireService } from 'src/_services/customer-require.service';
declare var $: any;
@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css']
})
export class CustomerSupportComponent implements OnInit {
  isSend = false;
  cusRequireData: any = {
    id: 0,
    customerId: 0,
    title: "",
    description: "",
    status: "Đang chờ phản hồi",
    receptionDate: new Date,
    staffId: 0,
    response: ""
  }
  userData: any;
  constructor(private _service: CustomerRequireService, private _accountService: AccountService) { }

  ngOnInit(): void {
  }

  sendRequest() {
    this.userData = JSON.parse(localStorage.getItem('user') || "0");
    console.log(this.userData)
    if (this.userData === 0) return alert("Đăng nhập để sử dụng dịch vụ!");
    if (!this.cusRequireData.title.trim()) return alert("Trường Tiêu đề KHÔNG được để trống!");
    if (!this.cusRequireData.description.trim()) return alert("Trường Nội dung KHÔNG được để trống!");

    this.cusRequireData.customerId = this.userData.id;
    console.log(this.cusRequireData)
    this._service.createOrUpdate(this.cusRequireData).subscribe(res => {
      console.log(res);
      this.reset();
      alert("Chúng tôi đã nhận được phản hồi của bạn. Xin cảm ơn vì sự chia sẻ của bạn!");
      },
      error => {
        alert("Đã xảy ra lỗi gì đó! Vui lòng thử lại!")
      });
  }



  reset() {
    this.cusRequireData = {
      id: 0,
      customerId: 0,
      title: "",
      description: "",
      status: "",
      receptionDate: new Date,
      staffId: 0,
      response: ""
    }
  }
}
