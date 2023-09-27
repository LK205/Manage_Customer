import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/_models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly apiUrl = "https://localhost:44391/api/";
  constructor(private http: HttpClient) { } 

  getAccountById(id: number):Observable<any>{
    let _url = this.apiUrl + "Account/GetById?id=" + encodeURIComponent("" + id)
    return this.http.get<any>(_url);
  }
  
  createAccount(val: Account){
    let _url = this.apiUrl + "Account/Create";
    return this.http.post(_url, val);
  }

  checkAccount(email: string, password : string){
    let _url = this.apiUrl + "Account/CheckAccount?Email=" + encodeURIComponent("" + email) + "&Password=" + encodeURIComponent("" + password);
    return this.http.get<any>(_url); 
  }
}
