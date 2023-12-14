using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TTCSN_CustomerManage.Models;

#nullable disable

namespace TTCSN_CustomerManage.Data
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<CustomerRequire> CustomerRequires { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=LMK205\\SQLEXPRESS; Database=CUSTOMER_MANAGE; User Id=sa;Password=Leminhkhoi2003;TrustServerCertificate=True;");
            }
        }
    }
}
