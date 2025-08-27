
using Fintcs.Api.Models.Entities;

namespace Fintcs.Api.Models.DTOs;

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = null!;
    public DateTime ExpiresAt { get; set; }
}

public class UserDto
{
    public Guid Id { get; set; }
    public string EdpNo { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string AddressOffice { get; set; } = string.Empty;
    public string AddressResidence { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public string PhoneOffice { get; set; } = string.Empty;
    public string PhoneResidence { get; set; } = string.Empty;
    public string Mobile { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public Guid? SocietyId { get; set; }
    public string? SocietyName { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateUserRequest
{
    public string EdpNo { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string AddressOffice { get; set; } = string.Empty;
    public string AddressResidence { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public string PhoneOffice { get; set; } = string.Empty;
    public string PhoneResidence { get; set; } = string.Empty;
    public string Mobile { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public Guid? SocietyId { get; set; }
}
