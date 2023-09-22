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
    public class CustomerRequireController : APIControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CustomerRequireController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAll")]
        public async Task<List<CustomerRequireDto>> GetAll(string Status)
        {
            var result = from c in _db.CustomerRequires.Where(p => string.IsNullOrWhiteSpace(Status) || p.Status == Status)
                         join q in _db.CustomerInfors on c.CustomerId equals q.Id into qJoined
                         from q in qJoined.DefaultIfEmpty()
                         select new CustomerRequireDto
                         {
                             Id = c.Id,
                             CustomerId = c.CustomerId,
                             CustomerName = q.Name,
                             Title = c.Title,
                             Description = c.Description,
                             Status = c.Status,
                         };

            return result.ToList();

        }
        [HttpPost("Create")]
        public async Task Create(CustomerRequireDto dto)
        {
            var newUserRequire = new CustomerRequire();
            newUserRequire.Id = dto.Id;
            newUserRequire.CustomerId = dto.CustomerId;
            newUserRequire.Title = dto.Title;
            newUserRequire.Description = dto.Description;
            newUserRequire.Status = dto.Status;

            _db.CustomerRequires.Add(newUserRequire);
            _db.SaveChanges();
        }
        [HttpPut("Edit")]
        public async Task Edit(CustomerRequireDto dto)
        {
            var UserRequire = _db.CustomerRequires.Find(dto.Id);
            if (UserRequire != null)
            {
                UserRequire.Id = dto.Id;
                UserRequire.CustomerId = dto.CustomerId;
                UserRequire.Title = dto.Title;
                UserRequire.Description = dto.Description;
                UserRequire.Status = dto.Status;

                _db.CustomerRequires.Update(UserRequire);
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
            var check = await _db.CustomerRequires.FindAsync(id);
            if (check != null)
            {
                _db.CustomerRequires.Remove(check);
                _db.SaveChanges();
            }
            else
            {
                throw new Exception("Id does not exist!");
            }
        }
    }
}
