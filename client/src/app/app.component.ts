import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private _accountService: AccountService){

  }
  ngOnInit(): void {
    this.router.navigateByUrl('/');
    this.setCurrentUser();
  }
  title = 'Service';
  image = '../assets/br.jpg';

  setCurrentUser(){
    if(localStorage.getItem('user') !== null){
      const user : any = JSON.parse(localStorage.getItem('user') || ""); 
      this._accountService.setCurrentUser(user);
    }
  }
}
