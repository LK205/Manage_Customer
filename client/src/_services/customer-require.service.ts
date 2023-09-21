import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRequire } from 'src/_models/customer_require';

@Injectable({
  providedIn: 'root'
})
export class CustomerRequireService {
  readonly apiUrl = "https://localhost:44391/api/";
  constructor(private http: HttpClient) { }

  getAll(status: string | null | undefined):Observable<any[]>{
    let _url = this.apiUrl + "CustomerRequire/GetAll?";
    if(status !== undefined && status !== null){
      _url += "Status=" + encodeURIComponent("" + status) + "&";
    }
    _url = _url.replace(/[?&]$/, "");
    return this.http.get<any>(_url);
  }
  
  getAllById(id: number):Observable<any[]>{
    let _url = this.apiUrl + "CustomerRequire/GetAllById?id=" + encodeURIComponent("" + id);
    return this.http.get<any>(_url);
  }

  createCustomerRequire(val: CustomerRequire){
    let _url = this.apiUrl + "CustomerRequire/Create";
    return this.http.post(_url, val);
  }

  editCustomerRequire(val: CustomerRequire){
    let _url = this.apiUrl + "CustomerRequire/Edit";
    return this.http.put(_url, val);
  }

  deleteCustomerRequire(id: number){
    let _url = this.apiUrl + "CustomerRequire/Delete?id=" + encodeURIComponent("" + id);
    return this.http.delete(_url);
  }
}
