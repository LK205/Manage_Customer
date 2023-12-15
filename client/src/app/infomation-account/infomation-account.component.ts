import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-infomation-account',
  templateUrl: './infomation-account.component.html',
  styleUrls: ['./infomation-account.component.css']
})
export class InfomationAccountComponent implements OnInit {

  userData: any;
  currentPassword = "";
  confirmPassword = "";
  dateFormat = "";
  lastName = "";
  firstName = "";
  phoneNumber = "";
  avatar = "";


  constructor(private _service: AccountService){}
  ngOnInit(): void {
    this.setup();

  }

  setup(){
    this.userData = JSON.parse(localStorage.getItem('user') || "0");
    this.userData.avatar = (this.userData.avatar === null || this.userData.avatar.trim() === "") ? null : this.userData.avatar;
    this.userData.dayOfBirth = new Date(this.userData.dayOfBirth).toLocaleDateString()
    this.userData.passWord = "";

    this.lastName = this.userData.lastName;
    this.firstName = this.userData.firstName;
    this.phoneNumber = this.userData.phoneNumber;
    this.avatar = this.userData.avatar;


    let parts = this.userData.dayOfBirth.split('/');
    let date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
    this.dateFormat = this.getFormattedDate(date);
  }


  updateAccount(){
    this.userData.firstName = this.firstName.trim();
    this.userData.lastName = this.lastName.trim();
    this.userData.avatar = this.avatar;
    this.userData.phoneNumber = this.phoneNumber.trim();
    
    if(this.userData.firstName.trim() === "") return alert("Họ không được để trống!");
    if(this.userData.lastName.trim() === "") return alert("Tên không được để trống!");
    if(this.dateFormat.trim() === "") return alert("Ngày không hợp lệ!");

    this.userData.dayOfBirth = new Date(this.dateFormat);
    this._service.updateAccount(this.userData).subscribe(res=>{
      localStorage.setItem('user', JSON.stringify(this.userData));
      this._service.setCurrentUser(this.userData);
      this.userData.dayOfBirth = new Date(this.userData.dayOfBirth).toLocaleDateString()
      alert("Cập nhật thành công!");
    })
  }

  changePassword(){
    if(this.currentPassword.trim() === "") return alert("Mật khẩu hiện tại KHÔNG được để trống!")
    if(this.userData.passWord.trim() === "") return alert("Mật khẩu mới KHÔNG được để trống!")
    if(this.confirmPassword.trim() === "") return alert("Xác nhận Mật khẩu KHÔNG được để trống!")
    if(this.userData.passWord.trim() !== this.confirmPassword.trim()) return alert("Mật khẩu xác nhận KHÔNG khớp!")


    this._service.changePassword(this.userData.id, this.currentPassword,this.userData.passWord ).subscribe(res=>{
      if(res){
        this.userData.passWord = "";
        this.currentPassword = "";
        this.confirmPassword = "";
        alert("Đổi mật khẩu thành công!");
      }
      else{
        alert("Mật khẩu hiện tại KHÔNG đúng!");
      }
    },
    error =>{
      alert("Đã xảy ra lỗi! Hãy kiểm tra lại đường truyền!");
    })
  }
  onselectionFile(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onloadend = (value: any) => {
      this.avatar = value.target.result.toString();
    }
  }
  getFormattedDate(date: Date): string {

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }
}
