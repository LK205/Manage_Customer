using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TTCSN_CustomerManage.Data;
using TTCSN_CustomerManage.Dto;
using TTCSN_CustomerManage.Models;

namespace TTCSN_CustomerManage.Controllers
{

    public class AccountController : APIControllerBase
    {
        private readonly ApplicationDbContext _db;

        public AccountController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAll")]
        public async Task<List<AccountAppDto>> GetAll()
        {
            var result = from c in _db.AccountApps
                         select new AccountAppDto
                        {
                             Id = c.Id,
                             AccountPermissions = c.AccountPermissions,
                             PassWord = c.PassWord,
                             UserName = c.UserName
                         };

            return result.ToList();

        }
        [HttpGet("GetById")]
        public async Task<AccountAppDto> GetAllById(long id)
        {
            var check = await _db.AccountApps.FirstOrDefaultAsync(p=> p.Id == id);

            if (check == null)
            {
                throw new Exception("Id does not exits");
            }
            else
            {
                var result = new AccountAppDto
                {
                    Id = check.Id,
                    AccountPermissions = check.AccountPermissions,
                    PassWord = check.PassWord,
                    UserName = check.UserName
                };
                return result;
            }

        }
        [HttpGet("CheckAccount")]
        public async Task<long> CheckAccount(string UserName, string Password)
        {
            var result = await _db.AccountApps.FirstOrDefaultAsync(p => p.UserName == UserName && p.PassWord == Password);
            if (result == null)
            {
                return 0;
            }
            else return result.Id;

        }
        [HttpPost("Create")]
        public async Task Create(AccountAppDto dto)
        {
            var newAccount = new AccountApp();
            
            newAccount.Id = dto.Id;
            newAccount.UserName = dto.UserName;
            newAccount.AccountPermissions = dto.AccountPermissions;
            newAccount.PassWord = dto.PassWord;

            _db.AccountApps.Add(newAccount);
            _db.SaveChanges();
        }
        [HttpPut("Edit")]
        public async Task Edit(AccountAppDto dto)
        {
                var newAccount = _db.AccountApps.Find(dto.Id);
                if (newAccount != null)
                {
                    newAccount.Id = dto.Id;
                    newAccount.UserName = dto.UserName;
                    newAccount.AccountPermissions = dto.AccountPermissions;
                    newAccount.PassWord = dto.PassWord;
                    _db.AccountApps.Update(newAccount);
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
            var check = await _db.AccountApps.FindAsync(id);
            if(check != null)
            {
                _db.AccountApps.Remove(check);
                _db.SaveChanges();
            }
            else
            {
                throw new Exception("Id does not exist!");
            }
        }
    }
}
