using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TTCSN_CustomerManage.Migrations
{
    public partial class allData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account_App",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    PassWord = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    AccountPermissions = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account_App", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customer_Infor",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Age = table.Column<long>(type: "bigint", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ClassCustomer = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DayOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()"),
                    ImageBase64 = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer_Infor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CustomerRequire",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<long>(type: "bigint", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerRequire", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerRequire_Account_Infor",
                        column: x => x.CustomerId,
                        principalTable: "Customer_Infor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_App",
                table: "Account_App",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customer_Infor",
                table: "Customer_Infor",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequire",
                table: "CustomerRequire",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerRequire_CustomerId",
                table: "CustomerRequire",
                column: "CustomerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account_App");

            migrationBuilder.DropTable(
                name: "CustomerRequire");

            migrationBuilder.DropTable(
                name: "Customer_Infor");
        }
    }
}
