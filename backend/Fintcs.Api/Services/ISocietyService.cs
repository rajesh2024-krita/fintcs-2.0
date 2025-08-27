
using Fintcs.Api.Models.DTOs;

namespace Fintcs.Api.Services;

public interface ISocietyService
{
    Task<IEnumerable<SocietyDto>> GetAllAsync();
    Task<SocietyDto> GetByIdAsync(Guid id);
    Task<SocietyDto> CreateAsync(CreateSocietyRequest request);
    Task<SocietyDto> UpdateAsync(Guid id, CreateSocietyRequest request);
    Task DeleteAsync(Guid id);
}
