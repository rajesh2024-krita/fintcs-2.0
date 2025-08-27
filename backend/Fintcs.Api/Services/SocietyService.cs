
using AutoMapper;
using Fintcs.Api.Models.DTOs;
using Fintcs.Api.Models.Entities;
using Fintcs.Api.Repositories;

namespace Fintcs.Api.Services;

public class SocietyService : ISocietyService
{
    private readonly ISocietyRepository _societyRepository;
    private readonly IMapper _mapper;

    public SocietyService(ISocietyRepository societyRepository, IMapper mapper)
    {
        _societyRepository = societyRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SocietyDto>> GetAllAsync()
    {
        var societies = await _societyRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<SocietyDto>>(societies);
    }

    public async Task<SocietyDto> GetByIdAsync(Guid id)
    {
        var society = await _societyRepository.GetByIdAsync(id);
        if (society == null)
        {
            throw new ArgumentException("Society not found");
        }
        return _mapper.Map<SocietyDto>(society);
    }

    public async Task<SocietyDto> CreateAsync(CreateSocietyRequest request)
    {
        var society = _mapper.Map<Society>(request);
        society.Id = Guid.NewGuid();
        society.CreatedAt = DateTime.UtcNow;
        society.UpdatedAt = DateTime.UtcNow;

        await _societyRepository.CreateAsync(society);
        return _mapper.Map<SocietyDto>(society);
    }

    public async Task<SocietyDto> UpdateAsync(Guid id, CreateSocietyRequest request)
    {
        var society = await _societyRepository.GetByIdAsync(id);
        if (society == null)
        {
            throw new ArgumentException("Society not found");
        }

        _mapper.Map(request, society);
        society.UpdatedAt = DateTime.UtcNow;

        await _societyRepository.UpdateAsync(society);
        return _mapper.Map<SocietyDto>(society);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _societyRepository.DeleteAsync(id);
    }
}
