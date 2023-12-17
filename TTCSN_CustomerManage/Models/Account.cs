using System;
using System.Collections.Generic;

#nullable disable

namespace TTCSN_CustomerManage.Models
{
    public partial class Account
    {

        public long Id { get; set; }
        public string Email { get; set; }
        public string PassWord { get; set; }
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DayOfBirth { get; set; }
        public string ClassCustomer { get; set; }
        public long Role { get; set; }
        public long DepartmentId { get; set; }
        public DateTime CreationTime { get; set; }
        public string   Avatar {  get; set; }
        public bool IsActive { get; set; }
    }
}
