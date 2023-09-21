using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TTCSN_CustomerManage.Models;

#nullable disable

namespace TTCSN_CustomerManage.Data
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AccountApp> AccountApps { get; set; }
        public virtual DbSet<CustomerInfor> CustomerInfors { get; set; }
        public virtual DbSet<CustomerRequire> CustomerRequires { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=LMK205\\SQLEXPRESS;Initial Catalog=CUSTOMER_MANAGE;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<AccountApp>(entity =>
            {
                entity.ToTable("Account_App");

                entity.HasIndex(e => e.Id, "IX_Account_App")
                    .IsUnique();

                entity.Property(e => e.PassWord)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<CustomerInfor>(entity =>
            {
                entity.ToTable("Customer_Infor");

                entity.HasIndex(e => e.Id, "IX_Customer_Infor")
                    .IsUnique();

                entity.Property(e => e.Address).HasMaxLength(50);

                entity.Property(e => e.ImageBase64).HasMaxLength(250);

                entity.Property(e => e.ClassCustomer).HasMaxLength(50);

                entity.Property(e => e.Email).HasMaxLength(50);
                entity.Property(e => e.CreationTime).HasDefaultValueSql("getutcdate()");
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(50);
                
            });

            modelBuilder.Entity<CustomerRequire>(entity =>
            {
                entity.ToTable("CustomerRequire");

                entity.HasIndex(e => e.Id, "IX_CustomerRequire")
                    .IsUnique();

                entity.Property(e => e.Status).HasMaxLength(50);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CustomerRequires)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CustomerRequire_Account_Infor");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
