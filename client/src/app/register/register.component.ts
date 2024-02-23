import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  dataAccount: any = {
    id: 0,
    email: "",
    phoneNumber: "",
    password: "",
    creationTime: new Date,
    role: 0,
    firstName: "",
    lastName: "",
    dayOfBirth: new Date,
    classCustomer: 'Đồng',
    departmentId: 0,
    avatar: "",
    isActive: true
  };
  checkBox: boolean = false;
  regEmail = /^\w+@[a-zA-Z]+\.com$/i;
  confirmPass: string = "";

  constructor(private _serviceAccount: AccountService) { }

  ngOnInit(): void {
  }


  register() {
    if (this.dataAccount.firstName.trim === "") {
      alert("Trường Tên đệm không được để trống!");
      return;
    }
    if (this.dataAccount.lastName.trim === "") {
      alert("Trường Tên không được để trống!");
      return;
    }
    if (this.dataAccount.email.trim === "") {
      alert("Trường Email không được để trống!");
      return;
    }
    if (this.dataAccount.phoneNumber.trim === "") {
      alert("Trường số điện thoại không được để trống!");
      return;
    }
    if (this.dataAccount.password.trim === "") {
      alert("Mật khẩu không hợp lệ không được để trống!");
      return;
    }
    if (!this.regEmail.test(this.dataAccount.email)) {
      alert("Email không hợp lệ!!!");
      return;
    }
    if (!this.checkBox) {
      alert("Đồng ý điều khoản của chúng tôi!");
      return;
    }
    if (this.confirmPass !== this.dataAccount.password) {
      alert("Mật xác thực chưa chính xác!");
      return;
    }

    this._serviceAccount.register(this.dataAccount).subscribe(res => {
      if(res){
        this.reset();
        alert("Đăng ký thành công!");
      }
      else alert("Email đã bị trùng!");
    },
      error => {
        alert("Lỗi kết nối!")
      });


  }

  reset() {
    this.dataAccount = {
      id: 0,
    email: "",
    phoneNumber: "",
    password: "",
    creationTime: new Date,
    role: 0,
    firstName: "",
    lastName: "",
    dayOfBirth: new Date,
    classCustomer: 'Đồng',
    departmentId: 0,
    avatar: "",
    isActive: true
    };
    this.confirmPass = "";
  }
}
