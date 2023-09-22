import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerInfor } from 'src/_models/customer_infor';

@Injectable({
  providedIn: 'root'
})
export class Customeri4Service {
  readonly apiUrl = "https://localhost:44391/api/";
  constructor(private http: HttpClient) { }

  getAll(request: string | null | undefined, fromAge: number | null | undefined, toAge: number | null | undefined): Observable<any[]> {
    let _url = this.apiUrl + "CustomerInfor/GetAll?";
    if (request !== undefined && request !== null) {
      _url += "request=" + encodeURIComponent("" + request) + "&";
    }
    if (fromAge !== undefined && fromAge !== null) {
      _url += "fromAge=" + encodeURIComponent("" + fromAge) + "&";
    }
    if (toAge !== undefined && toAge !== null) {
      _url += "toAge=" + encodeURIComponent("" + toAge) + "&";
    }
    _url = _url.replace(/[?&]$/, "");
    return this.http.get<any>(_url);
  }

  getById(id: number): Observable<any> {
    let _url = this.apiUrl + "CustomerInfor/GetAll?id=" + encodeURIComponent("" + id);
    return this.http.get<any>(_url);
  }

  createCustomerI4(val: CustomerInfor) {
    let _url = this.apiUrl + "CustomerInfor/Create";
    return this.http.post(_url, val);
  }

  editCustomerI4(val: CustomerInfor) {
    let _url = this.apiUrl + "CustomerInfor/Edit";
    return this.http.put(_url, val);
  }

  deleteCustomerI4(id: number) {
    let _url = this.apiUrl + "CustomerInfor/Delete?id=" + encodeURIComponent("" + id);
    return this.http.delete<any>(_url);
  }
}
