using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WeatherWebAPIKoncar.Data;
using WeatherWebAPIKoncar.Models;

namespace WeatherWebAPIKoncar.Controllers
{
    [Route("api/search")]
    [ApiController]
    [Authorize]
    public class SearchController : ControllerBase
    {
        private readonly AppDbContext _db;
        public SearchController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveSearch([FromBody] Search search)
        {
            var userIdClaim = User.FindFirst("id")?.Value;

            var userId = Guid.Parse(userIdClaim);

            var searchdto = new Search
            {
                Id = Guid.NewGuid(),
                City = search.City,
                SearchDate = DateTime.UtcNow,
                WeatherCondition = search.WeatherCondition,
                UserId = userId
            };

            _db.Searches.Add(searchdto);
            await _db.SaveChangesAsync();
            return Ok(search);
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            Guid userId = Guid.Parse(User.FindFirst("id")?.Value);
            var searches = await _db.Searches
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.SearchDate)
                .ToListAsync();
            return Ok(searches);
        }
    }
}