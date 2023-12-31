USE [CUSTOMER_MANAGE]
GO
/****** Object:  StoredProcedure [dbo].[spGetAllRequireByCus]    Script Date: 12/12/23 11:24:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spGetAllRequireByCus]
		@Request nvarchar(250),
		@Id int,
		@Status nvarchar(250),
		@PageSize int,
		@PageNumber int
as Begin
	Declare @count int;
	if @PageNumber = 1 Set @count = 0;
	else Set @count = @PageSize;
	Select  cr.*, staff.FirstName, staff.LastName, staff.PhoneNumber
	from CustomerRequires cr 
	left join Accounts staff on cr.CustomerId = staff.Id
	where (Title like N'%' + @Request + '%')
	and (cr.Id = @Id)
	and  (Status like N'%' + @Status+ '%') 
	Order By Id DESC
	Offset (@count * (@PageNumber - 1)) rows
	fetch next @PageSize rows only
end
GO
/****** Object:  StoredProcedure [dbo].[spGetAllRequireByCusTotal]    Script Date: 12/12/23 11:24:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spGetAllRequireByCusTotal]
		@Request nvarchar(250),
		@Id int,
		@Status nvarchar(250)
as Begin
	Select Count(*) as TotalCount
	from CustomerRequires cr 
	left join Accounts staff on cr.CustomerId = staff.Id
	where (Title like N'%' + @Request + '%')
	and (cr.Id = @Id)
	and  (Status like N'%' + @Status+ '%') 
end
GO
/****** Object:  StoredProcedure [dbo].[spGetAllRequireByStaff]    Script Date: 12/12/23 11:24:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spGetAllRequireByStaff]
		@Request nvarchar(250),
		@Status nvarchar(250),
		@PageSize int,
		@PageNumber int
as Begin
	Declare @count int;
	if @PageNumber = 1 Set @count = 0;
	else Set @count = @PageSize;
	Select  cr.*, customer.FirstName , customer.LastName , 
		customer.PhoneNumber , customer.Id as CustomerId
	from CustomerRequires cr 
	left join Accounts customer on cr.CustomerId = customer.Id
	where ((Title like N'%' + @Request + '%') or (customer.FirstName like N'%' + @Request + '%') 
	or (customer.LastName like N'%' + @Request + '%') or (customer.PhoneNumber like N'%' + @Request + '%'))
	and  (Status like N'%' + @Status+ '%') 
	Order By Id DESC
	Offset (@count * (@PageNumber - 1)) rows
	fetch next @PageSize rows only
end
GO
/****** Object:  StoredProcedure [dbo].[spGetAllRequireByStaffTotal]    Script Date: 12/12/23 11:24:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spGetAllRequireByStaffTotal]
		@Request nvarchar(250),
		@Status nvarchar(250)
as Begin
	Select Count(*) as TotalCount
	from CustomerRequires cr 
	left join Accounts customer on cr.CustomerId = customer.Id
	where ((Title like N'%' + @Request + '%') or (customer.FirstName like N'%' + @Request + '%') 
	or (customer.LastName like N'%' + @Request + '%') or (customer.PhoneNumber like N'%' + @Request + '%'))
	and  (Status like N'%' + @Status+ '%') 
end
GO
