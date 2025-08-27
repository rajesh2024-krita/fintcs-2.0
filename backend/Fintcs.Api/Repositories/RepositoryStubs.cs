
using Fintcs.Api.Models.Entities;
using Fintcs.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Fintcs.Api.Repositories;

// Society Repository
public interface ISocietyRepository
{
    Task<Society?> GetByIdAsync(Guid id);
    Task<IEnumerable<Society>> GetAllAsync();
    Task<Society> CreateAsync(Society society);
    Task<Society> UpdateAsync(Society society);
    Task DeleteAsync(Guid id);
}

public class SocietyRepository : ISocietyRepository
{
    private readonly FintcsDbContext _context;

    public SocietyRepository(FintcsDbContext context)
    {
        _context = context;
    }

    public async Task<Society?> GetByIdAsync(Guid id)
    {
        return await _context.Societies.FindAsync(id);
    }

    public async Task<IEnumerable<Society>> GetAllAsync()
    {
        return await _context.Societies.Where(s => s.IsActive).OrderBy(s => s.Name).ToListAsync();
    }

    public async Task<Society> CreateAsync(Society society)
    {
        _context.Societies.Add(society);
        await _context.SaveChangesAsync();
        return society;
    }

    public async Task<Society> UpdateAsync(Society society)
    {
        _context.Societies.Update(society);
        await _context.SaveChangesAsync();
        return society;
    }

    public async Task DeleteAsync(Guid id)
    {
        var society = await _context.Societies.FindAsync(id);
        if (society != null)
        {
            society.IsActive = false;
            await _context.SaveChangesAsync();
        }
    }
}

// Stub repositories
public interface IMemberRepository
{
    Task<string> GetMembersAsync();
}

public interface ILoanRepository
{
    Task<string> GetLoansAsync();
}

public interface IVoucherRepository
{
    Task<string> GetVouchersAsync();
}

public interface ILookupRepository
{
    Task<string> GetLookupDataAsync();
}

public class MemberRepository : IMemberRepository
{
    public async Task<string> GetMembersAsync()
    {
        await Task.CompletedTask;
        return "Members repository";
    }
}

public class LoanRepository : ILoanRepository
{
    public async Task<string> GetLoansAsync()
    {
        await Task.CompletedTask;
        return "Loans repository";
    }
}

public class VoucherRepository : IVoucherRepository
{
    public async Task<string> GetVouchersAsync()
    {
        await Task.CompletedTask;
        return "Vouchers repository";
    }
}

public class LookupRepository : ILookupRepository
{
    public async Task<string> GetLookupDataAsync()
    {
        await Task.CompletedTask;
        return "Lookup repository";
    }
}
