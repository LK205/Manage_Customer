import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/_services/account.service';
declare var $: any;
@Component({
  selector: 'app-mange-account',
  templateUrl: './mange-account.component.html',
  styleUrls: ['./mange-account.component.css']
})
export class MangeAccountComponent implements OnInit {

  pageSize: number = 10;
  pageNumber: number = 1;
  totalPage: number = 10;
  paginationTitle: string = "Page 1 of 1";
  request = "";
  listData?: any[];
  data: any = {
    avatar: "",
    classCustomer: "",
    dayOfBirth: new Date,
    departmentId: 0,
    firstName: "",
    id: 0,
    lastName: "",
    phoneNumber: "",
    role: 0,
  }
  constructor(private _service: AccountService) { }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._service.getAll(this.request, this.pageSize, this.pageNumber).subscribe(res => {
      this.listData = res.result;
      this.listData.forEach(res => {
        res.dayOfBirth = new Date(res.dayOfBirth).toLocaleDateString()
      })
    },
      error => {

      })
  }

  search(event?: any) {
    if (event) {
      if (event.keyCode == 13) {
        this.pageNumber = 1;
        this.getAll();
      }
    }
    else {
      this.pageNumber = 1;
      this.getAll();
    }
  }

  getById(item: any) {
    $('#modalCustomerLabel').text('Người dùng');
    this.data = item;

    const parts = item.dayOfBirth.split('/');
    let date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
    this.data.dayOfBirth = this.getFormattedDate(date);
    $('#modalCustomer').modal('show');
  }

  closeModal() {
    this.search();
    $('#modalCustomer').modal('hide');
  }

  createOrUpdate() {
    this.data.dayOfBirth = new Date(this.data.dayOfBirth)
    this._service.updateAccount(this.data).subscribe(res => {
      alert("Cập nhật thành công!");
      this.closeModal();
    })
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

  changeActive(id) {
    if (!$(`#flexSwitchCheckChecked${id}`).prop("checked")) {
      if (!confirm("Bạn có chắc muốn dừng hoạt động của tài khoản này?")) {
        $(`#flexSwitchCheckChecked${id}`).prop("checked", true)
        return;
      }
    }
    this._service.changeActive(id).subscribe(res => {
      this.search();
    })

  }

  onselectionFile(file: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onloadend = (value: any) => {
      this.data.avatar = value.target.result.toString();
    }
  }

  getFormattedDate(date: Date): string {
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

}
