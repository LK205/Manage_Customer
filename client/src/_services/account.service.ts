import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Account } from 'src/_models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  readonly apiUrl = "https://localhost:44391/api/";

  private currentUser = new ReplaySubject<any>(1);
  currentUser$ = this.currentUser.asObservable()
  constructor(private http: HttpClient) { } 

  login(email: string, password: string){
    let _url = this.apiUrl + "Account/Login?email=" + encodeURIComponent("" + email) + "&password=" + encodeURIComponent("" + password);
    return this.http.get<any>(_url)
  }

  setCurrentUser(user: any){
    this.currentUser.next(user);
  }

  logOut(){
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }


  register(val: object){
    let _url = this.apiUrl + "Account/Register";
    return this.http.post(_url, val); 
  }

  updateAccount(val: object){
    let _url = this.apiUrl + "Account/UpdateAccount";
    return this.http.post(_url, val); 
  }

  changeRole(id: number, roleValue: number){
    let val = {id, roleValue};
    let _url = this.apiUrl + "Account/ChangeRole";
    return this.http.put(_url, val); 
  }

  changeActive(id: number){
    let _url = this.apiUrl + "Account/ChangeActive?id="+id;
    return this.http.get(_url); 
  }

  getAll(request: string, pageSize: number, pageNumber: number) : Observable<{result: any[], total: any[] }>{
    let _url = this.apiUrl + "Account/GetAll?";
    if (request !== null || request !== undefined) {
      _url += "request=" + encodeURIComponent("" + request) + "&";
    }
    if (pageSize !== null || pageSize !== undefined) {
      _url += "pageSize=" + encodeURIComponent("" + pageSize) + "&";
    }
    if (pageNumber !== null || pageNumber !== undefined) {
      _url += "pageNumber=" + encodeURIComponent("" + pageNumber) + "&";
    }
    _url = _url.replace(/[?&]$/, "");
    return this.http.get<any>(_url);
  }

  changePassword(id:number, oldPassword: string, newPassword: string){
    let _url = this.apiUrl + "Account/ChangePassword?";
    if (id !== null || id !== undefined) {
      _url += "id=" + encodeURIComponent("" + id) + "&";
    }
    if (oldPassword !== null || oldPassword !== undefined || oldPassword.trim() === "") {
      _url += "oldPassword=" + encodeURIComponent("" + oldPassword) + "&";
    }
    if (newPassword !== null || newPassword !== undefined || newPassword.trim() === "") {
      _url += "newPassword=" + encodeURIComponent("" + newPassword) + "&";
    }
    _url = _url.replace(/[?&]$/, "");
    return this.http.get<any>(_url);
  }

  getById(id: number){
    let _url = this.apiUrl + "Account/GetById?id=" + id;
    return this.http.get<any>(_url);
  }
  
  delete(id: number){
    let _url = this.apiUrl + "Account/Delete?id=" + id;
    return this.http.delete<any>(_url);
  }
}
