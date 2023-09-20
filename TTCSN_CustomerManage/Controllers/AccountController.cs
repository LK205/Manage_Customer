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

    public class AccountController : APIController
    {
        private readonly ApplicationDbContext _db;

        public AccountController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllAccount")]
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
