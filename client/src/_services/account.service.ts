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

  getAccount(userName: string, password: string):Observable<any>{
    let _url = this.apiUrl + "Account/CheckAccount?";
    if(userName !== undefined && userName !== null){
      _url += "UserName=" + encodeURIComponent("" + userName) + "&";
    }
    if(password !== undefined && password !== null){
      _url += "Password=" + encodeURIComponent("" + password) + "&";
    }
    _url = _url.replace(/[?&]$/,"");
    return this.http.get<any>(_url);
  }
  
  createAccount(val: Account){
    let _url = this.apiUrl + "Account/Create";
    return this.http.post(_url, val);
  }
}
