namespace TTCSN_CustomerManage.Dto
{
    public class AccountInforDto
    {
        public long Id { get; set; }
        public long AccountId { get; set; }
        public string Name { get; set; }
        public long? Age { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string ClassCustomer { get; set; }
        public string ImageBase64 { get; set; }
    }
}
