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
    public class UserRequireController : APIControllerBase
    {
        private readonly ApplicationDbContext _db;

        public UserRequireController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAll")]
        public async Task<List<UserRequireDto>> GetAll(string Status)
        {
            var result = from c in _db.UserRequires.Where(p => p.Status == Status)
                         select new UserRequireDto
                         {
                             Id = c.Id,
                             UserId = c.UserId,
                             Title = c.Title,
                             Description = c.Description,
                             Status = c.Status,
                         };

            return result.ToList();

        }
        [HttpPost("Create")]
        public async Task Create(UserRequireDto dto)
        {
            var newUserRequire = new UserRequire();
            newUserRequire.Id = dto.Id;
            newUserRequire.UserId = dto.UserId;
            newUserRequire.Title = dto.Title;
            newUserRequire.Description = dto.Description;
            newUserRequire.Status = dto.Status;

            _db.UserRequires.Add(newUserRequire);
            _db.SaveChanges();
        }
        [HttpPut("Edit")]
        public async Task Edit(UserRequireDto dto)
        {
            var UserRequire = _db.UserRequires.Find(dto.Id);
            if (UserRequire != null)
            {
                UserRequire.Id = dto.Id;
                UserRequire.UserId = dto.UserId;
                UserRequire.Title = dto.Title;
                UserRequire.Description = dto.Description;
                UserRequire.Status = dto.Status;

                _db.UserRequires.Update(UserRequire);
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
            var check = await _db.UserRequires.FindAsync(id);
            if (check != null)
            {
                _db.UserRequires.Remove(check);
                _db.SaveChanges();
            }
            else
            {
                throw new Exception("Id does not exist!");
            }
        }
    }
}
