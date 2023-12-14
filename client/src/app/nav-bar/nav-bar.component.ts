import { Component, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Account } from 'src/_models/account';
import { AccountService } from 'src/_services/account.service';
declare var $: any;
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  email: string = "";
  password: string = "";
  dataAccount: any = {
    role: 0
  };
  isLogin: boolean = false;
  constructor(private router: Router, private _accountService: AccountService) {

  }
  ngOnInit(): void {
    this.getCurrentUser();
  }


  login() {
    this._accountService.login(this.email, this.password).subscribe(res => {
      if (res) {
        localStorage.setItem('user', JSON.stringify(res));
        this._accountService.setCurrentUser(res);
        this.isLogin = true;
        $('#loginModal').modal("hide");
      }
      else {
        alert("Tài khoản không chính xác hoặc đã bị chặn!")
      }
    })
  }

  logout() {
    this._accountService.logOut()
    this.isLogin = false;
    this.router.navigateByUrl('/');
    this.dataAccount = {
      role: 0
    }
  }

  reset() {
    this.email = "";
    this.password = "";
    $('#loginModal').modal("show");
  }

  getCurrentUser() {
    this._accountService.currentUser$.subscribe(user => {
      this.isLogin = !!user;
      if (user) this.dataAccount = user;
      this.dataAccount.avatar = (this.dataAccount.avatar === null || this.dataAccount.avatar.trim() === "") ? null : this.dataAccount.avatar;
    })
  }
  test(){
    if(!this.isLogin) return alert("Bạn cần đăng nhập để sử dụng chức năng này!");

    this.router.navigateByUrl('CustomerReport');
  }
}
