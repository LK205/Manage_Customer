using System;

namespace TTCSN_CustomerManage.Dto
{
    public class CustomerInforDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long? Age { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public DateTime DayOfBirth { get; set; }
        public DateTime CreationTime { get; set; } = DateTime.Now;
        public string ClassCustomer { get; set; }
        public string ImageBase64 { get; set; }
    }
}
