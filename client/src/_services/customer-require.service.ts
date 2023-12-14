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

  getAll(request: string, status: string, pageSize: number, pageNumber: number) : Observable<{result: any[], total: any[] }>{
    let _url = this.apiUrl + "CustomerRequire/GetAll?";
    if (request !== null || request !== undefined) {
      _url += "request=" + encodeURIComponent("" + request) + "&";
    }
    if (status !== null || status !== undefined) {
      _url += "status=" + encodeURIComponent("" + status) + "&";
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

  getAllById(id: number,request: string, status: string, pageSize: number, pageNumber: number) : Observable<{result: any[], total: any[] }>{
    let _url = this.apiUrl + "CustomerRequire/GetAllById?";
    if (id !== null || id !== undefined) {
      _url += "id=" + encodeURIComponent("" + id) + "&";
    }
    if (request !== null || request !== undefined) {
      _url += "request=" + encodeURIComponent("" + request) + "&";
    }
    if (status !== null || status !== undefined) {
      _url += "status=" + encodeURIComponent("" + status) + "&";
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

  createOrUpdate(val: any){
    let url = this.apiUrl + "CustomerRequire/CreatOrUpdate";
    return this.http.post(url, val);
  }

  delete(id: number){
    return this.http.delete(this.apiUrl + "CustomerRequire/Delete?Id=" + id);
  }

  getById(id: number): Observable<any>{
    let url = this.apiUrl + "CustomerRequire/GetById?id=" + id;
    return this.http.get<any>(url);
  }
}
