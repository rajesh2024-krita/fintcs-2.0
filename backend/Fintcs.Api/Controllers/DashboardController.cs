
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Fintcs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    [HttpGet("stats")]
    public async Task<ActionResult> GetDashboardStats()
    {
        await Task.CompletedTask;
        
        // Mock dashboard statistics
        var stats = new
        {
            totalSocieties = 3,
            totalUsers = 12,
            totalMembers = 85,
            totalLoans = 23
        };

        return Ok(stats);
    }
}
