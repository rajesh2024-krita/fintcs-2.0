
using System.ComponentModel.DataAnnotations;

namespace Fintcs.Api.Models.Entities;

public class User
{
    public Guid Id { get; set; }
    
    [Required]
    [StringLength(50)]
    public string EdpNo { get; set; } = string.Empty;
    
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string AddressOffice { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string AddressResidence { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string Designation { get; set; } = string.Empty;
    
    [StringLength(20)]
    public string PhoneOffice { get; set; } = string.Empty;
    
    [StringLength(20)]
    public string PhoneResidence { get; set; } = string.Empty;
    
    [StringLength(20)]
    public string Mobile { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    [StringLength(100)]
    public string Username { get; set; } = string.Empty;
    
    [Required]
    public string PasswordHash { get; set; } = string.Empty;
    
    [Required]
    public UserRole Role { get; set; }
    
    public Guid? SocietyId { get; set; }
    public virtual Society? Society { get; set; }
    
    public bool IsActive { get; set; } = true;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum UserRole
{
    SuperAdmin,
    SocietyAdmin,
    User,
    Member
}
