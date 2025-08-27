
using Fintcs.Api.Models.DTOs;

namespace Fintcs.Api.Services;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);
    Task<UserDto> CreateUserAsync(CreateUserRequest request);
    Task<UserDto> GetUserByIdAsync(Guid id);
    Task<IEnumerable<UserDto>> GetUsersAsync(Guid? societyId = null);
    Task<UserDto> UpdateUserAsync(Guid id, CreateUserRequest request);
    Task DeleteUserAsync(Guid id);
}
