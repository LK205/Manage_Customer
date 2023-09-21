using System;
using System.Collections.Generic;

#nullable disable

namespace TTCSN_CustomerManage.Models
{
    public partial class AccountApp
    {

        public long Id { get; set; }
        public string UserName { get; set; }
        public string PassWord { get; set; }
        public long AccountPermissions { get; set; }

    }
}
