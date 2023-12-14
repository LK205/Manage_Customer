using TTCSN_CustomerManage.Models;

namespace API.Dto
{
    public class CustomerRequireDto : CustomerRequire
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public long CustomerId { get; set; }
    }
}
