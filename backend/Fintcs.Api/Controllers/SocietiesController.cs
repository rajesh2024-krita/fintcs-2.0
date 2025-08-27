
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Fintcs.Api.Services;
using Fintcs.Api.Models.DTOs;

namespace Fintcs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SocietiesController : ControllerBase
{
    private readonly ISocietyService _societyService;

    public SocietiesController(ISocietyService societyService)
    {
        _societyService = societyService;
    }

    [HttpGet]
    [Authorize(Roles = "SuperAdmin,SocietyAdmin")]
    public async Task<ActionResult<IEnumerable<SocietyDto>>> GetSocieties()
    {
        try
        {
            var societies = await _societyService.GetAllAsync();
            return Ok(societies);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SocietyDto>> GetSociety(Guid id)
    {
        try
        {
            var society = await _societyService.GetByIdAsync(id);
            return Ok(society);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<ActionResult<SocietyDto>> CreateSociety([FromBody] CreateSocietyRequest request)
    {
        try
        {
            var society = await _societyService.CreateAsync(request);
            return CreatedAtAction(nameof(GetSociety), new { id = society.Id }, society);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "SuperAdmin,SocietyAdmin")]
    public async Task<ActionResult<SocietyDto>> UpdateSociety(Guid id, [FromBody] CreateSocietyRequest request)
    {
        try
        {
            var society = await _societyService.UpdateAsync(id, request);
            return Ok(society);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "SuperAdmin")]
    public async Task<ActionResult> DeleteSociety(Guid id)
    {
        try
        {
            await _societyService.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}
