
using Fintcs.Api.Models.Entities;

namespace Fintcs.Api.Models.DTOs;

public class SocietyDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Fax { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public string RegistrationNo { get; set; } = string.Empty;
    public decimal DividendRate { get; set; }
    public decimal OdRate { get; set; }
    public decimal CdRate { get; set; }
    public decimal LoanRate { get; set; }
    public decimal EmergencyLoanRate { get; set; }
    public decimal LasRate { get; set; }
    public decimal ShareLimit { get; set; }
    public decimal LoanLimit { get; set; }
    public decimal EmergencyLoanLimit { get; set; }
    public decimal BounceChargeAmount { get; set; }
    public BounceChargeMode BounceChargeMode { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateSocietyRequest
{
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Fax { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public string RegistrationNo { get; set; } = string.Empty;
    public decimal DividendRate { get; set; }
    public decimal OdRate { get; set; }
    public decimal CdRate { get; set; }
    public decimal LoanRate { get; set; }
    public decimal EmergencyLoanRate { get; set; }
    public decimal LasRate { get; set; }
    public decimal ShareLimit { get; set; }
    public decimal LoanLimit { get; set; }
    public decimal EmergencyLoanLimit { get; set; }
    public decimal BounceChargeAmount { get; set; }
    public BounceChargeMode BounceChargeMode { get; set; }
}
