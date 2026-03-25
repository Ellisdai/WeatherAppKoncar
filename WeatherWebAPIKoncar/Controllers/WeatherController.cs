using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WeatherWebAPIKoncar.Services;
using WeatherWebAPIKoncar.Data;
using WeatherWebAPIKoncar.DTOs.Weather;

namespace WeatherWebAPIKoncar.Controllers
{
    [Route("api/weather")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly IWeatherService _weatherService;
        public WeatherController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet("forecast")]
        [Authorize]
        public async Task<IActionResult> GetForecas([FromQuery] string city)
        {
            var result = await _weatherService.GetForecastAsync(city);
            return Ok(result);
        }
        [HttpGet("current")]
        [Authorize]
        public async Task<IActionResult> GetCurrentWeather(double lat, double lon)
        {
            var result = await _weatherService.GetCurrentWeatherAsync(lat, lon);
            return Ok(result);
        }
    }
}
