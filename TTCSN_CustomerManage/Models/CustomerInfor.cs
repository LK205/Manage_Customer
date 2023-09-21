using System;
using System.Collections.Generic;

#nullable disable

namespace TTCSN_CustomerManage.Models
{
    public partial class CustomerInfor
    {
        public CustomerInfor()
        {
            CustomerRequires = new HashSet<CustomerRequire>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public long? Age { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string ClassCustomer { get; set; }
        public DateTime DayOfBirth { get; set; }
        public DateTime CreationTime { get; set; } = DateTime.Now;
        public string ImageBase64 { get; set; }
        public virtual ICollection<CustomerRequire> CustomerRequires { get; set; }
    }
}
