
using Fintcs.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace Fintcs.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(FintcsDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        // Seed Super Admin
        if (!await context.Users.AnyAsync(u => u.Role == UserRole.SuperAdmin))
        {
            var superAdmin = new User
            {
                Id = Guid.NewGuid(),
                EdpNo = "ADMIN001",
                Name = "Super Administrator",
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin"),
                Role = UserRole.SuperAdmin,
                Email = "admin@fintcs.com",
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.Users.Add(superAdmin);
        }

        // Seed Loan Types
        if (!await context.LoanTypes.AnyAsync())
        {
            var loanTypes = new[]
            {
                new LoanType { Id = Guid.NewGuid(), Name = "General", IsActive = true },
                new LoanType { Id = Guid.NewGuid(), Name = "Personal", IsActive = true },
                new LoanType { Id = Guid.NewGuid(), Name = "Housing", IsActive = true },
                new LoanType { Id = Guid.NewGuid(), Name = "Vehicle", IsActive = true },
                new LoanType { Id = Guid.NewGuid(), Name = "Education", IsActive = true },
                new LoanType { Id = Guid.NewGuid(), Name = "Others", IsActive = true }
            };

            context.LoanTypes.AddRange(loanTypes);
        }

        // Seed Banks
        if (!await context.Banks.AnyAsync())
        {
            var banks = new[]
            {
                new Bank { Id = Guid.NewGuid(), Name = "State Bank of India", IsActive = true },
                new Bank { Id = Guid.NewGuid(), Name = "HDFC Bank", IsActive = true },
                new Bank { Id = Guid.NewGuid(), Name = "ICICI Bank", IsActive = true },
                new Bank { Id = Guid.NewGuid(), Name = "Punjab National Bank", IsActive = true },
                new Bank { Id = Guid.NewGuid(), Name = "Bank of Baroda", IsActive = true }
            };

            context.Banks.AddRange(banks);
        }

        // Seed Voucher Types
        if (!await context.VoucherTypes.AnyAsync())
        {
            var voucherTypes = new[]
            {
                new VoucherType { Id = Guid.NewGuid(), Name = "Payment", IsActive = true },
                new VoucherType { Id = Guid.NewGuid(), Name = "Receipt", IsActive = true },
                new VoucherType { Id = Guid.NewGuid(), Name = "Journal", IsActive = true },
                new VoucherType { Id = Guid.NewGuid(), Name = "Contra", IsActive = true },
                new VoucherType { Id = Guid.NewGuid(), Name = "Adjustment", IsActive = true },
                new VoucherType { Id = Guid.NewGuid(), Name = "Others", IsActive = true }
            };

            context.VoucherTypes.AddRange(voucherTypes);
        }

        // Seed Months
        if (!await context.Months.AnyAsync())
        {
            var months = new[]
            {
                new Month { Id = Guid.NewGuid(), Code = "JAN", Name = "January", MonthNumber = 1 },
                new Month { Id = Guid.NewGuid(), Code = "FEB", Name = "February", MonthNumber = 2 },
                new Month { Id = Guid.NewGuid(), Code = "MAR", Name = "March", MonthNumber = 3 },
                new Month { Id = Guid.NewGuid(), Code = "APR", Name = "April", MonthNumber = 4 },
                new Month { Id = Guid.NewGuid(), Code = "MAY", Name = "May", MonthNumber = 5 },
                new Month { Id = Guid.NewGuid(), Code = "JUN", Name = "June", MonthNumber = 6 },
                new Month { Id = Guid.NewGuid(), Code = "JUL", Name = "July", MonthNumber = 7 },
                new Month { Id = Guid.NewGuid(), Code = "AUG", Name = "August", MonthNumber = 8 },
                new Month { Id = Guid.NewGuid(), Code = "SEP", Name = "September", MonthNumber = 9 },
                new Month { Id = Guid.NewGuid(), Code = "OCT", Name = "October", MonthNumber = 10 },
                new Month { Id = Guid.NewGuid(), Code = "NOV", Name = "November", MonthNumber = 11 },
                new Month { Id = Guid.NewGuid(), Code = "DEC", Name = "December", MonthNumber = 12 }
            };

            context.Months.AddRange(months);
        }

        await context.SaveChangesAsync();
    }
}
