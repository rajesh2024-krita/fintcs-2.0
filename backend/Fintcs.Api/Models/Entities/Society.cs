
using System.ComponentModel.DataAnnotations;

namespace Fintcs.Api.Models.Entities;

public class Society
{
    public Guid Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string Address { get; set; } = string.Empty;
    
    [StringLength(100)]
    public string City { get; set; } = string.Empty;
    
    [StringLength(20)]
    public string Phone { get; set; } = string.Empty;
    
    [StringLength(20)]
    public string Fax { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string Email { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string Website { get; set; } = string.Empty;
    
    [StringLength(100)]
    public string RegistrationNo { get; set; } = string.Empty;
    
    // Interest rates
    public decimal DividendRate { get; set; }
    public decimal OdRate { get; set; }
    public decimal CdRate { get; set; }
    public decimal LoanRate { get; set; }
    public decimal EmergencyLoanRate { get; set; }
    public decimal LasRate { get; set; }
    
    // Limits
    public decimal ShareLimit { get; set; }
    public decimal LoanLimit { get; set; }
    public decimal EmergencyLoanLimit { get; set; }
    
    // Bounce charges
    public decimal BounceChargeAmount { get; set; }
    public BounceChargeMode BounceChargeMode { get; set; }
    
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public virtual ICollection<User> Users { get; set; } = new List<User>();
    public virtual ICollection<Member> Members { get; set; } = new List<Member>();
}

public enum BounceChargeMode
{
    ExcessProvision,
    Cash,
    HDFCBank,
    Inverter
}
