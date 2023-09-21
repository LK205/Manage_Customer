using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using TTCSN_CustomerManage.Data;
using TTCSN_CustomerManage.Dto;
using TTCSN_CustomerManage.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TTCSN_CustomerManage.Controllers
{
    public class CustomerInforController : APIControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CustomerInforController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAll")]
        public async Task<List<CustomerInforDto>> GetAll(string request, long fromAge, long toAge = 1000)
        {
            var result = from c in _db.CustomerInfors
                         where (string.IsNullOrEmpty(request) || c.Name.Contains(request) || c.PhoneNumber.Contains(request) || c.Email.Contains(request))
                               && c.Age >= fromAge
                               && c.Age <= toAge
                         select new CustomerInforDto
                         {
                             Id = c.Id,
                             Name = c.Name,
                             Age = c.Age,
                             PhoneNumber = c.PhoneNumber,
                             Email = c.Email,
                             Address = c.Address,
                             ClassCustomer = c.ClassCustomer,
                             ImageBase64 = c.ImageBase64,
                             CreationTime = c.CreationTime,
                             DayOfBirth = c.DayOfBirth,
                         };

            return result.ToList();

        }
        [HttpGet("GetById")]
        public async Task<CustomerInforDto> GetById(long id)
        {
            var infor = await _db.CustomerInfors.FirstOrDefaultAsync(p => p.Id == id);
            var result = new CustomerInforDto
            {
                Id = infor.Id,
                Name = infor.Name,
                Age = infor.Age,
                PhoneNumber = infor.PhoneNumber,
                Email = infor.Email,
                Address = infor.Address,
                ClassCustomer = infor.ClassCustomer,
                ImageBase64 = infor.ImageBase64,
                CreationTime = infor.CreationTime,
                DayOfBirth = infor.DayOfBirth,

            };

            return result;

        }
        [HttpPost("Create")]
        public async Task Create(CustomerInforDto dto)
        {
            var today = DateTime.Now;
            var age = today.Year - dto.DayOfBirth.Year;
            var newAccountInfor = new CustomerInfor();
            newAccountInfor.Id = dto.Id;
            newAccountInfor.Name = dto.Name;
            newAccountInfor.Age = DateTime.Now > dto.DayOfBirth? age + 1 : age;
            newAccountInfor.PhoneNumber = dto.PhoneNumber;
            newAccountInfor.Email = dto.Email;
            newAccountInfor.Address = dto.Address;
            newAccountInfor.ClassCustomer = dto.ClassCustomer;
            newAccountInfor.ImageBase64 = dto.ImageBase64;
            newAccountInfor.CreationTime = dto.CreationTime;
            newAccountInfor.DayOfBirth = dto.DayOfBirth;

            _db.CustomerInfors.Add(newAccountInfor);
            _db.SaveChanges();
        }
        [HttpPut("Edit")]
        public async Task Edit(CustomerInforDto dto)
        {
            var today = DateTime.Now;
            var age = today.Year - dto.DayOfBirth.Year;
            var AccountInfor = _db.CustomerInfors.Find(dto.Id);
            if (AccountInfor != null)
            {
                AccountInfor.Id = dto.Id;
                AccountInfor.Name = dto.Name;
                AccountInfor.Age = DateTime.Now > dto.DayOfBirth ? age + 1 : age;
                AccountInfor.PhoneNumber = dto.PhoneNumber;
                AccountInfor.Email = dto.Email;
                AccountInfor.Address = dto.Address;
                AccountInfor.ClassCustomer = dto.ClassCustomer;
                AccountInfor.ImageBase64 = dto.ImageBase64;
                AccountInfor.CreationTime = dto.CreationTime;
                AccountInfor.DayOfBirth = dto.DayOfBirth;

                _db.CustomerInfors.Update(AccountInfor);
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
            var check = await _db.CustomerInfors.FindAsync(id);
            if (check != null)
            {
                _db.CustomerInfors.Remove(check);
                _db.SaveChanges();
            }
            else
            {
                throw new Exception("Id does not exist!");
            }
        }
    }
}
