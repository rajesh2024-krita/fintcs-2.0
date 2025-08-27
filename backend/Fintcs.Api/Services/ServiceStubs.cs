
using Fintcs.Api.Models.DTOs;

namespace Fintcs.Api.Services;

// Stub interfaces for remaining services
public interface IUserService
{
    Task<string> GetDashboardStatsAsync();
}

public interface IMemberService
{
    Task<string> GetMembersAsync();
}

public interface ILoanService
{
    Task<string> GetLoansAsync();
}

public interface IVoucherService
{
    Task<string> GetVouchersAsync();
}

public interface ILookupService
{
    Task<string> GetLookupDataAsync();
}

// Stub implementations
public class UserService : IUserService
{
    public async Task<string> GetDashboardStatsAsync()
    {
        await Task.CompletedTask;
        return "Dashboard stats";
    }
}

public class MemberService : IMemberService
{
    public async Task<string> GetMembersAsync()
    {
        await Task.CompletedTask;
        return "Members data";
    }
}

public class LoanService : ILoanService
{
    public async Task<string> GetLoansAsync()
    {
        await Task.CompletedTask;
        return "Loans data";
    }
}

public class VoucherService : IVoucherService
{
    public async Task<string> GetVouchersAsync()
    {
        await Task.CompletedTask;
        return "Vouchers data";
    }
}

public class LookupService : ILookupService
{
    public async Task<string> GetLookupDataAsync()
    {
        await Task.CompletedTask;
        return "Lookup data";
    }
}
