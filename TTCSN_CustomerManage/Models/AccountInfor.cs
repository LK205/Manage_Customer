using System;
using System.Collections.Generic;

#nullable disable

namespace TTCSN_CustomerManage.Models
{
    public partial class AccountInfor
    {
        public AccountInfor()
        {
            UserRequires = new HashSet<UserRequire>();
        }

        public long Id { get; set; }
        public long AccountId { get; set; }
        public string Name { get; set; }
        public long? Age { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string ClassCustomer { get; set; }

        public virtual AccountApp Account { get; set; }
        public virtual ICollection<UserRequire> UserRequires { get; set; }
    }
}
