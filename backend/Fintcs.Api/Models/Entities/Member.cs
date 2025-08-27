
using System.ComponentModel.DataAnnotations;

namespace Fintcs.Api.Models.Entities;

public class Member
{
    public Guid Id { get; set; }
    
    [Required]
    [StringLength(50)]
    public string MemNo { get; set; } = string.Empty;
    
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string FatherHusbandName { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string AddressOffice { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string AddressResidence { get; set; } = string.Empty;
    
    [StringLength(100)]
    public string City { get; set; } = string.Empty;
    
    [StringLength(20)]
    public string PhoneOffice { get; set; } = string.Empty;
    
    [StringLength(20)]
    public string PhoneResidence { get; set; } = string.Empty;
    
    [StringLength(20)]
    public string Mobile { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string Designation { get; set; } = string.Empty;
    
    public DateTime Dob { get; set; }
    public DateTime DojSociety { get; set; }
    public DateTime DojOrg { get; set; }
    public DateTime? Dor { get; set; }
    
    [StringLength(200)]
    public string Nominee { get; set; } = string.Empty;
    
    [StringLength(100)]
    public string NomineeRelation { get; set; } = string.Empty;
    
    public decimal OpeningBalanceShare { get; set; }
    public decimal OpeningBalanceValue { get; set; }
    public BalanceType BalanceType { get; set; }
    
    [StringLength(200)]
    public string BankName { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string PayableAt { get; set; } = string.Empty;
    
    [StringLength(50)]
    public string AccountNo { get; set; } = string.Empty;
    
    public MemberStatus Status { get; set; } = MemberStatus.Active;
    
    public string Deductions { get; set; } = string.Empty; // JSON array
    
    [StringLength(500)]
    public string? PhotoUrl { get; set; }
    
    [StringLength(500)]
    public string? SignatureUrl { get; set; }
    
    [Required]
    public Guid SocietyId { get; set; }
    public virtual Society Society { get; set; } = null!;
    
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum BalanceType
{
    Credit,
    Debit,
    CreditDeposit
}

public enum MemberStatus
{
    Active,
    Deactive
}
