import { Component, OnInit } from '@angular/core';
import { CustomerRequireService } from 'src/_services/customer-require.service';
declare var $: any;
@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit{
  request: string = "";
  pageSize: number = 9;
  pageNumber: number = 1;
  status = "";
  totalPage: number = 10;
  paginationTitle: string = "";
  listData: any[] | undefined;
  userData: any;
  data: any = {
    
  };
  constructor(private _service: CustomerRequireService){}
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || "0");
    this.getAll()
  }

  getAll(){
    if(this.userData === "0") return alert("Hãy đăng nhập để sử dụng tính năng!");
    
    this._service.getAllById(this.userData.id,this.request,this.status,this.pageSize, this.pageNumber).subscribe(res=>{
      this.listData = res.result;
      this.totalPage = Math.ceil(res.total[0].totalCount / this.pageSize);
      this.paginationTitle = "Page " + this.pageNumber + " of " + (this.totalPage == 0 ? 1 : this.totalPage);
    })
  }

  search(event?: any) {
    if (event) {
      if (event.keyCode === 13) { 
        this.pageNumber = 1;
        this.getAll();
      }
    } else {
      this.pageNumber = 1;
      this.getAll();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.getAll();
    }
  }
  nextPage() {
    if (this.pageNumber < this.totalPage) {
      this.pageNumber += 1;
      this.getAll();
    }
  }


  
 
}
