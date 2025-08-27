
using System.ComponentModel.DataAnnotations;

namespace Fintcs.Api.Models.Entities;

public class LoanType
{
    public Guid Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    public bool IsActive { get; set; } = true;
    
    public virtual ICollection<Loan> Loans { get; set; } = new List<Loan>();
}

public class Bank
{
    public Guid Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;
    
    public bool IsActive { get; set; } = true;
    
    public virtual ICollection<Loan> Loans { get; set; } = new List<Loan>();
}

public class VoucherType
{
    public Guid Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    
    public bool IsActive { get; set; } = true;
}

public class Month
{
    public Guid Id { get; set; }
    
    [Required]
    [StringLength(10)]
    public string Code { get; set; } = string.Empty;
    
    [Required]
    [StringLength(20)]
    public string Name { get; set; } = string.Empty;
    
    public int MonthNumber { get; set; }
}
