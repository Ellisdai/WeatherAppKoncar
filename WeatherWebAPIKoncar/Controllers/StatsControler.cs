using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using WeatherWebAPIKoncar.Data;

namespace WeatherWebAPIKoncar.Controllers
{
    [Route("api/stats")]
    [ApiController]
    [Authorize]
    public class StatsControler : ControllerBase
    {
        private readonly AppDbContext _db;
        public StatsControler(AppDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<IActionResult> GetStats()
        {
            var topCities = await _db.Searches
                .GroupBy(s => s.City)
                .Select(g => new { City = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .Take(3)
                .ToListAsync();

            var latestSearches = await _db.Searches
                .OrderByDescending(s => s.SearchDate)
                .Take(3)
                .ToListAsync();

            var allForecasts = await _db.Searches
                .GroupBy(s => s.WeatherCondition)
                .Select(g => new { WeatherCondition = g.Key, Count = g.Count() })
                .ToListAsync();

            return Ok(new
            {
                TopCities = topCities,
                LatestSearches = latestSearches,
                WeatherCounts = allForecasts
            });
        }
    }
}
