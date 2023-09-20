using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using TTCSN_CustomerManage.Data;
using TTCSN_CustomerManage.Dto;
using TTCSN_CustomerManage.Models;
using System.Linq;

namespace TTCSN_CustomerManage.Controllers
{
    public class AccountInforController : APIControllerBase
    {
        private readonly ApplicationDbContext _db;

        public AccountInforController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAll")]
        public async Task<List<AccountInforDto>> GetAll(string request, long fromAge, long toAge = 1000)
        {
            var result = from c in _db.AccountInfors
                         where (string.IsNullOrEmpty(request) || c.Name.Contains(request) || c.PhoneNumber.Contains(request) || c.Email.Contains(request))
                               && c.Age >= fromAge
                               && c.Age <= toAge
                         select new AccountInforDto
                         {
                             Id = c.Id,
                             AccountId = c.AccountId,
                             Name = c.Name,
                             Age = c.Age,
                             PhoneNumber = c.PhoneNumber,
                             Email = c.Email,
                             Address = c.Address,
                             ClassCustomer = c.ClassCustomer,
                             ImageBase64 = c.ImageBase64,
                         };

            return result.ToList();

        }
        [HttpPost("Create")]
        public async Task Create(AccountInforDto dto)
        {
            var newAccountInfor = new AccountInfor();
            newAccountInfor.Id = dto.Id;
            newAccountInfor.AccountId = dto.AccountId;
            newAccountInfor.Name = dto.Name;
            newAccountInfor.Age = dto.Age;
            newAccountInfor.PhoneNumber = dto.PhoneNumber;
            newAccountInfor.Email = dto.Email;
            newAccountInfor.Address = dto.Address;
            newAccountInfor.ClassCustomer = dto.ClassCustomer;
            newAccountInfor.ImageBase64 = dto.ImageBase64;


            _db.AccountInfors.Add(newAccountInfor);
            _db.SaveChanges();
        }
        [HttpPut("Edit")]
        public async Task Edit(AccountInforDto dto)
        {
            var AccountInfor = _db.AccountInfors.Find(dto.Id);
            if (AccountInfor != null)
            {
                AccountInfor.Id = dto.Id;
                AccountInfor.AccountId = dto.AccountId;
                AccountInfor.Name = dto.Name;
                AccountInfor.Age = dto.Age;
                AccountInfor.PhoneNumber = dto.PhoneNumber;
                AccountInfor.Email = dto.Email;
                AccountInfor.Address = dto.Address;
                AccountInfor.ClassCustomer = dto.ClassCustomer;
                AccountInfor.ImageBase64 = dto.ImageBase64;
                _db.AccountInfors.Update(AccountInfor);
                _db.SaveChanges();
            }
            else
            {
                throw new Exception("Id does not exist!");
            }
        }
        [HttpDelete("Delete")]
        public async Task Delete(long id)
        {
            var check = await _db.AccountInfors.FindAsync(id);
            if (check != null)
            {
                _db.AccountInfors.Remove(check);
                _db.SaveChanges();
            }
            else
            {
                throw new Exception("Id does not exist!");
            }
        }
    }
}
