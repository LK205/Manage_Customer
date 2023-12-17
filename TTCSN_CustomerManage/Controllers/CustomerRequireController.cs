using API.Dto;
using API.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;
using RTCWeb.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TTCSN_CustomerManage.Controllers;
using TTCSN_CustomerManage.Data;
using TTCSN_CustomerManage.Models;

namespace API.Controllers
{
    public class CustomerRequireController : APIControllerBase
    {
        private readonly ApplicationDbContext _db;
        private CustomerRequireRepo _repo = new CustomerRequireRepo();
        public CustomerRequireController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAll")]
        public async Task<object> GetAll(string request ="", string status ="", int pageSize=10, int pageNumber = 1)
        {
            List<CustomerRequireDto> result = SQLHelper<CustomerRequireDto>.ProcedureToList("spGetAllRequireByStaff",
                new string[] { "@Request", "@Status", "@PageSize", "@PageNumber" },
                new object[] { request ?? "" , status ?? "", pageSize, pageNumber });
            List<TotalResult> total = SQLHelper<TotalResult>.ProcedureToList("spGetAllRequireByStaffTotal",
                new string[] { "@Request", "@Status" },
                new object[] { request ?? "", status ?? "" });

            return new { result, total };
        }

        [HttpGet("GetAllById")]
        public async Task<object> GetAllById(long id, string request="", string status = "", int pageSize = 10, int pageNumber = 1)
        {
            List<CustomerRequireDto> result = SQLHelper<CustomerRequireDto>.ProcedureToList("spGetAllRequireByCus",
                new string[] { "@Request", "@Status", "@PageSize", "@PageNumber", "@Id" },
                new object[] { request ?? "", status ?? "", pageSize, pageNumber, id });

            List<TotalResult> total = SQLHelper<TotalResult>.ProcedureToList("spGetAllRequireByCusTotal",
                new string[] { "@Request", "@Status", "@Id" },
                new object[] { request ?? "", status ?? "", id });

            return new { result, total };
        }

        [HttpGet("GetById")]
        public async Task<List<CustomerRequireDto>> GetById(long id)
        {
            var result = from c in _db.CustomerRequires
                         join j in _db.Accounts on c.StaffId equals j.Id
                         select new CustomerRequireDto()
                         {
                             FirstName = j.FirstName,
                             LastName = j.LastName,
                             PhoneNumber = j.PhoneNumber,
                             CustomerId = j.Id,
                             Id = c.Id,
                             Title = c.Title,
                             Description = c.Description,
                             Status = c.Status,
                             ReceptionDate = c.ReceptionDate,
                             StaffId = c.StaffId,
                             Response = c.Response,
                         };
            return result.ToList();
        }

        [HttpPost("CreatOrUpdate")]
        public async Task<bool> CreateOrUpdate(CustomerRequire data)
        {
            if(data.Id > 0) await _repo.UpdateAsync(data);
            else await _repo.CreateAsync(data);
            return true;
        }

        [HttpDelete("Delete")]
        public async Task<bool> Delete(long Id)
        {
            _repo.Delete(Id);
            return true;
        }

        [HttpDelete("DeleteAllById")]
        public async Task<bool> DeleteAllById(long Id)
        {
            var result = _repo.GetAll().Where(p=> p.CustomerId == Id);
            foreach (var item in result)
            {
                _repo.Delete(item.Id);
            }
            return true;
        }
    }
}
