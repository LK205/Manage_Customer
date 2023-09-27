import { Component, OnInit } from '@angular/core';
import { Account } from 'src/_models/account';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checkBox: boolean = false;
  dataRegister: Account;
  confirmPassword: string;
  regEmail = /^\w+@[a-zA-Z]+\.com$/i;
  constructor(private _service: AccountService) {
  }
  ngOnInit(): void {
    this.dataRegister = {
      id: 0,
      userName: "",
      passWord: "",
      email: ""
    }
  }

  register() {
    if(this.dataRegister.userName == ""){
      alert("The user name field cannot be left blank")
      return;
    }
    if(this.dataRegister.email == ""){
      alert("The user name field cannot be left blank")
      return;
    }
    if(this.dataRegister.passWord == ""){
      alert("The user name field cannot be left blank")
      return;
    }
    if (this.confirmPassword !== this.dataRegister.passWord) {
      alert("The password is not a match!");
      return;
    }
    if(!this.checkBox){
      alert("You need to agree to all statements");
      return;
    }
    this._service.createAccount(this.dataRegister).subscribe(res =>{
      alert("Create account success!")
    },
    error =>{
      alert("Email was used!")
    })
  }
}
