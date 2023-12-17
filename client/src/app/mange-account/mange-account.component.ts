import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/_services/account.service';
import { CustomerRequireService } from 'src/_services/customer-require.service';
declare var $: any;
@Component({
  selector: 'app-mange-account',
  templateUrl: './mange-account.component.html',
  styleUrls: ['./mange-account.component.css']
})
export class MangeAccountComponent implements OnInit {
  regEmail = /^\w+@[a-zA-Z]+\.com$/i;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalPage: number = 10;
  paginationTitle: string = "Page 1 of 1";
  request = "";
  listData?: any[];
  data: any = {
    avatar:  "",
    classCustomer: "",
    dayOfBirth: new Date,
    departmentId: 0,
    firstName: "",
    id: 0,
    lastName: "",
    phoneNumber: "",
    role: 0,
  }
  dataDetails: any = {
    avatar:  "",
    classCustomer: "",
    dayOfBirth: new Date,
    departmentId: 0,
    firstName: "",
    id: 0,
    lastName: "",
    phoneNumber: "",
    role: 0,
  };
  listDataDetails: any;
  confirmPassword = ""
  constructor(private _service: AccountService, private _cusRequireService: CustomerRequireService) { }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._service.getAll(this.request, this.pageSize, this.pageNumber).subscribe(res => {
      this.listData = res.result;
      this.listData.forEach(res => {
        res.dayOfBirth = new Date(res.dayOfBirth).toLocaleDateString()
        res.avatar = res.avatar === "" ? null : res.avatar;
      })

      this.totalPage = Math.ceil(res.total[0].totalCount / this.pageSize);
      this.paginationTitle = "Page " + this.pageNumber + " of " +this.totalPage;
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
  showModal(){
    this.data = {
      avatar: "",
      classCustomer: "",
      dayOfBirth: "",
      departmentId: 0,
      firstName: "",
      id: 0,
      lastName: "",
      phoneNumber: "",
      role: 0,
    }
    this.confirmPassword = "";
    $('#modalCustomer').modal('show');
  }
  async showModalDetail(id:number){
    await this._service.getById(id).subscribe(res=>{
      this.dataDetails = res;
      this.dataDetails.dayOfBirth = new Date(this.dataDetails.dayOfBirth).toLocaleDateString();
      this.dataDetails.avatar =  (this.dataDetails.avatar === null || this.dataDetails.avatar.trim() === "") ? null : this.dataDetails.avatar;
    })
    await this._cusRequireService.getAllById(id,"","",5,1).subscribe(result=>{
      this.listDataDetails = result.result;
      this.listDataDetails.forEach(res1 =>{
        res1.receptionDate = new Date(res1.receptionDate).toLocaleDateString();
      })
    })
    $('#modalCustomerDetail').modal('show');
  }
  createOrUpdate(){
    if(this.data.id > 0){
      this.Update();
    }
    else{
      this.Create();
    }
  }
  Create(){
    
    if(!this.data.firstName || this.data.firstName.trim() === ""){
      return alert("Trường Họ KHÔNG được bỏ trống!");
    }
    if(!this.data.lastName || this.data.lastName.trim() === ""){
      return alert("Trường Tên KHÔNG được bỏ trống!");
    }
    if(!this.data.email || this.data.email.trim() === ""){
      return alert("Trường Email KHÔNG được bỏ trống!");
    }
    if(!this.regEmail.test(this.data.email)){
      return alert("Email KHÔNG hợp lệ!");
    }
    if(!this.data.passWord || this.data.passWord.trim() === ""){
      return alert("Nhập mật khẩu!");
    }
    if(this.data.passWord !== this.confirmPassword){
      return alert("Mật khẩu xác nhận không chính xác!");
    }
    if(!this.data.phoneNumber || this.data.phoneNumber.trim() === ""){
      return alert("Trường Điện thoại KHÔNG được bỏ trống!");
    }
    if(!this.data.dayOfBirth || this.data.dayOfBirth === ""){
      return alert("Ngày sinh không hợp lệ!");
    }
    if(!this.data.classCustomer || this.data.classCustomer === ""){
      return alert("Nhóm ưu Không tiên được để trống!");
    }

    this._service.register(this.data).subscribe(res=>{
      alert("Tạo tài khoản thành công!");
      this.closeModal();
    })
  }

  Update() {
    this.data.dayOfBirth = new Date(this.data.dayOfBirth)

    if(!this.data.lastName || this.data.lastName.trim() === ""){
      return alert("Trường Họ KHÔNG được bỏ trống!");
    }
    if(!this.data.firstName || this.data.firstName.trim() === ""){
      return alert("Trường Tên KHÔNG được bỏ trống!");
    }
    if(!this.data.phoneNumber || this.data.phoneNumber.trim() === ""){
      return alert("Trường Điện thoại KHÔNG được bỏ trống!");
    }
    if(!this.data.dayOfBirth || this.data.dayOfBirth === ""){
      return alert("Ngày sinh không hợp lệ!");
    }
    if(!this.data.classCustomer || this.data.classCustomer === ""){
      return alert("Nhóm ưu tiên được để trống!");
    }
    
    this._service.updateAccount(this.data).subscribe(res => {
      alert("Cập nhật thành công!");
      this.closeModal();
    })
  }

  delete(id : number){
    if(confirm("Bạn có chắc chắn muốn xóa tài khoản này?")){
      this._service.delete(id).subscribe(res =>{
        this.search();
        alert("Xóa tài khoản thành công!");
        this._cusRequireService.deleteAllById(id).subscribe(res=>{

        })

      })
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
