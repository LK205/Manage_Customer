using System;
using System.Collections.Generic;

#nullable disable

namespace TTCSN_CustomerManage.Models
{
    public partial class UserRequire
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }

        public virtual AccountInfor User { get; set; }
    }
}
