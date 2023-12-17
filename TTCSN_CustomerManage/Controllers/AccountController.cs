using API.Dto;
using API.Repository;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using RTCWeb.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Security.Principal;
using System.Threading.Tasks;
using TTCSN_CustomerManage.Data;
using TTCSN_CustomerManage.Models;

namespace TTCSN_CustomerManage.Controllers
{

    public class AccountController : APIControllerBase
    {
        private readonly ApplicationDbContext _db;
        private AccountRepo _repo = new AccountRepo();
        public AccountController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("Login")]
        public async Task<Account> Login(string email, string password)
        {
            Account account = _repo.GetAll().FirstOrDefault(p=> p.Email.ToLower() == email.ToLower() && p.PassWord == HASH.ToSHA256(password ?? "") && p.IsActive == true);
            return account;
        }

        [HttpPost("Register")]
        public async Task<bool> Register(Account data)
        {
            //Trùng email!
            bool check = _repo.GetAll().Any(p=> p.Email.ToLower() == data.Email.ToLower() && p.Id != data.Id);
            if (check) return false;
            data.Email = data.Email.ToLower();
            data.CreationTime = DateTime.Now;
            data.Role = 0;
            data.PassWord = HASH.ToSHA256(data.PassWord ?? "");
            data.IsActive = true;

            data.Avatar = data.Avatar ?? "";
            data.DayOfBirth =  data.DayOfBirth == null ?  DateTime.Now : data.DayOfBirth;
            data.ClassCustomer = data.ClassCustomer ?? "Đồng";
            data.DepartmentId = 0;

            // 0 la khach hang
            // 1 Admin
            await _repo.CreateAsync(data);
            return true;
        }

        [HttpPost("UpdateAccount")]
        public async Task<bool> UpdateAccount(Account data)
        {
            Account newAccount = _repo.GetByID(data.Id);
            newAccount.PhoneNumber = data.PhoneNumber;
            newAccount.FirstName = data.FirstName;
            newAccount.LastName = data.LastName;
            newAccount.DayOfBirth = data.DayOfBirth;
            newAccount.ClassCustomer = data.ClassCustomer;
            newAccount.Role = data.Role;
            newAccount.DepartmentId = data.DepartmentId;
            newAccount.Avatar = data.Avatar;
            await _repo.UpdateAsync(newAccount);

            return true;
        }

        [HttpGet("ChangeActive")]
        public async Task<bool> ChangeActive(long id)
        {
            Account newAccount = _repo.GetByID(id);
            newAccount.IsActive = !newAccount.IsActive;
            await _repo.UpdateAsync(newAccount);

            return true;
        }


        [HttpPut("ChangeRole")]
        public async Task<bool> ChangeRole(long id, long roleValue)
        {
            Account account = _repo.GetByID(id);
            account.Role = roleValue;
            await _repo.UpdateAsync(account);
            return true;
        }

        [HttpGet("ChangePassword")]
        public async Task<bool> ChangePassword(long id, string oldPassword, string newPassword)
        {
            Account account = _repo.GetByID(id);
            bool check = (account.PassWord == HASH.ToSHA256(oldPassword));
            if (!check) return false;

            account.PassWord = HASH.ToSHA256(newPassword);
            await _repo.UpdateAsync(account);
            return true;
        }

        [HttpGet("GetAll")]
        public async Task<object> GetAll(string request = "", int pageSize = 10, int pageNumber = 1)
        {
            List<Account> result = SQLHelper<Account>.ProcedureToList("spGetAllAccount",
                new string[] { "@Request", "@PageSize", "@PageNumber" },
                new object[] { request ?? "" , pageSize, pageNumber });
            List<TotalResult> total = SQLHelper<TotalResult>.ProcedureToList("spGetAllAccountTotal",
                new string[] { "@Request"},
                new object[] { request ?? "" });

            return new { result, total };
        }

        [HttpGet("GetById")]
        public async Task<Account> GetById(long Id)
        {
            return _repo.GetByID(Id);
        }

        [HttpDelete("Delete")]
        public async Task<bool> Delete(long Id)
        {
            _repo.Delete(Id);
            return true;
        }
    }
}
