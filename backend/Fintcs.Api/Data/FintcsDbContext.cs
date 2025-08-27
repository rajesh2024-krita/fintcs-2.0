
using Microsoft.EntityFrameworkCore;
using Fintcs.Api.Models.Entities;

namespace Fintcs.Api.Data;

public class FintcsDbContext : DbContext
{
    public FintcsDbContext(DbContextOptions<FintcsDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Society> Societies { get; set; }
    public DbSet<Member> Members { get; set; }
    public DbSet<Loan> Loans { get; set; }
    public DbSet<LoanType> LoanTypes { get; set; }
    public DbSet<Bank> Banks { get; set; }
    public DbSet<VoucherType> VoucherTypes { get; set; }
    public DbSet<Month> Months { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User entity configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.EdpNo);
            
            entity.HasOne(e => e.Society)
                  .WithMany(s => s.Users)
                  .HasForeignKey(e => e.SocietyId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.Property(e => e.Role)
                  .HasConversion<string>();
        });

        // Society entity configuration
        modelBuilder.Entity<Society>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Name);
            entity.HasIndex(e => e.RegistrationNo);
            
            entity.Property(e => e.BounceChargeMode)
                  .HasConversion<string>();
        });

        // Member entity configuration
        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.MemNo).IsUnique();
            
            entity.HasOne(e => e.Society)
                  .WithMany(s => s.Members)
                  .HasForeignKey(e => e.SocietyId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.Property(e => e.BalanceType)
                  .HasConversion<string>();
            
            entity.Property(e => e.Status)
                  .HasConversion<string>();
        });

        // Loan entity configuration
        modelBuilder.Entity<Loan>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.LoanNo).IsUnique();
            entity.HasIndex(e => e.EdpNo);
            
            entity.HasOne(e => e.LoanType)
                  .WithMany(lt => lt.Loans)
                  .HasForeignKey(e => e.LoanTypeId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(e => e.Bank)
                  .WithMany(b => b.Loans)
                  .HasForeignKey(e => e.BankId)
                  .OnDelete(DeleteBehavior.SetNull);
            
            entity.HasOne(e => e.Society)
                  .WithMany()
                  .HasForeignKey(e => e.SocietyId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.Property(e => e.PaymentMode)
                  .HasConversion<string>();
        });

        // Lookup entities
        modelBuilder.Entity<LoanType>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Name);
        });

        modelBuilder.Entity<Bank>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Name);
        });

        modelBuilder.Entity<VoucherType>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Name);
        });

        modelBuilder.Entity<Month>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Code);
            entity.HasIndex(e => e.MonthNumber);
        });
    }
}
