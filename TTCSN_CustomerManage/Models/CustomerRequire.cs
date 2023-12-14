using System;
using System.Collections.Generic;

#nullable disable

namespace TTCSN_CustomerManage.Models
{
    public partial class CustomerRequire
    {
        public long Id { get; set; }
        public long CustomerId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }

        public DateTime ReceptionDate { get; set; }
        public long StaffId { get; set; }
        public string Response { get; set; }

    }
}
