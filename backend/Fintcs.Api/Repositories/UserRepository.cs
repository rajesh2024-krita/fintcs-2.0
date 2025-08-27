
using Fintcs.Api.Data;
using Fintcs.Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Fintcs.Api.Repositories;

public class UserRepository : IUserRepository
{
    private readonly FintcsDbContext _context;

    public UserRepository(FintcsDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _context.Users
            .Include(u => u.Society)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _context.Users
            .Include(u => u.Society)
            .FirstOrDefaultAsync(u => u.Username == username);
    }

    public async Task<IEnumerable<User>> GetAllAsync(Guid? societyId = null)
    {
        var query = _context.Users.Include(u => u.Society).AsQueryable();
        
        if (societyId.HasValue)
        {
            query = query.Where(u => u.SocietyId == societyId);
        }

        return await query.OrderBy(u => u.Name).ToListAsync();
    }

    public async Task<User> CreateAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task DeleteAsync(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}
