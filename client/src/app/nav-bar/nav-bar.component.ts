import { Component, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Account } from 'src/_models/account';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  email: string = "";
  password: string = "";
  dataAccount: Account;
  isLogin: boolean = true;
  constructor(private _service: AccountService, private router: Router,) {

  }
  ngOnInit(): void {
  }


  login() {
    this._service.checkAccount(this.email, this.password).subscribe(res => {
      if (res != 0) {
        this._service.getAccountById(res).subscribe(result => {
          this.dataAccount = result;
          this.changeLogin();
          this.router.navigateByUrl('customer');
        })
      }
      else alert("email or password  is not valid!");
    });
  }

  changeLogin(){
    this.isLogin = !this.isLogin;
  }


}
