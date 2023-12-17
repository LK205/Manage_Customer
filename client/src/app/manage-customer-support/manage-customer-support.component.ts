import { Component, OnInit } from '@angular/core';
import { CustomerRequireService } from 'src/_services/customer-require.service';
declare var $:any;
@Component({
  selector: 'app-manage-customer-support',
  templateUrl: './manage-customer-support.component.html',
  styleUrls: ['./manage-customer-support.component.css']
})
export class ManageCustomerSupportComponent implements OnInit{
  
  request: string = "";
  pageSize: number = 10;
  pageNumber: number = 1;
  status = "";
  totalPage: number = 10;
  paginationTitle: string = "";
  listData: any[] | undefined;
  data: any = {
    
  };

  constructor(private _service: CustomerRequireService){}
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this._service.getAll(this.request,this.status,this.pageSize, this.pageNumber).subscribe(res=>{
      this.listData = res.result;
      this.listData.forEach(result => {
        result.receptionDate = new Date(result.receptionDate).toLocaleDateString()
      })
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

  getData(data:any){
    $('#modalCustomerRequireLabel').text('Phản hồi từ khách hàng');
    this.data = data;
    // const parts = data.receptionDate.split('/');
    // let date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
    // this.data.receptionDate = this.getFormattedDate(date);
    $('#modalCustomerRequire').modal('show');
  }

  createOrUpdate() {
    this.data.status = "Đã phản hồi";
    const parts = this.data.receptionDate.split('/');
    this.data.receptionDate = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
    this._service.createOrUpdate(this.data).subscribe(res => {
      this.closeModal();
      alert("Đã phản hồi thành công!");
    }, error => {
      alert("Đã xảy ra lỗi gì đó! Hãy kiểm tra lại đường truyền!")
    })
  }

  closeModal() {
    this.getAll();
    $('#modalCustomerRequire').modal('hide');
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

  getFormattedDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }
  

  delete(id:number){
    if(confirm("Bạn có chắc chắc muốn xóa phản hồi này?")){
      this._service.delete(id).subscribe(res =>{
        this.search();
      })
    }
  }
}
