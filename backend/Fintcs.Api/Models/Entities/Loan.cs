
using System.ComponentModel.DataAnnotations;

namespace Fintcs.Api.Models.Entities;

public class Loan
{
    public Guid Id { get; set; }
    
    [Required]
    [StringLength(50)]
    public string LoanNo { get; set; } = string.Empty;
    
    public Guid LoanTypeId { get; set; }
    public virtual LoanType LoanType { get; set; } = null!;
    
    public DateTime LoanDate { get; set; }
    
    [StringLength(50)]
    public string EdpNo { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;
    
    public decimal LoanAmount { get; set; }
    public decimal PrevLoan { get; set; }
    public decimal NetLoan { get; set; }
    
    public int Installments { get; set; }
    public decimal InstallmentAmount { get; set; }
    
    public string Purpose { get; set; } = string.Empty;
    
    [StringLength(200)]
    public string AuthorizedBy { get; set; } = string.Empty;
    
    public PaymentMode PaymentMode { get; set; }
    
    public Guid? BankId { get; set; }
    public virtual Bank? Bank { get; set; }
    
    [StringLength(50)]
    public string? ChequeNo { get; set; }
    
    public DateTime? ChequeDate { get; set; }
    
    public decimal Share { get; set; }
    public decimal CD { get; set; }
    public decimal LastSalary { get; set; }
    public decimal MWF { get; set; }
    public decimal PayAmount { get; set; }
    
    public string GivenJson { get; set; } = string.Empty;
    public string TakenJson { get; set; } = string.Empty;
    
    [Required]
    public Guid SocietyId { get; set; }
    public virtual Society Society { get; set; } = null!;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum PaymentMode
{
    Cash,
    Cheque,
    Opening
}
