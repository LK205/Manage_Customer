namespace TTCSN_CustomerManage.Dto
{
    public class CustomerRequireDto
    {
        public long Id { get; set; }
        public long CustomerId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }
}
