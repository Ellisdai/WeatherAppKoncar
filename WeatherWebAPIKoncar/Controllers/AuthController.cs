using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeatherWebAPIKoncar.Data;
using WeatherWebAPIKoncar.Models;
using WeatherWebAPIKoncar.Services;
using WeatherWebAPIKoncar.DTOs.Auth;
using Microsoft.AspNetCore.Identity.Data;

namespace WeatherWebAPIKoncar.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IuserService _userService;

        public AuthController(AppDbContext db, IuserService iuserService)
        {
            _db = db;
            _userService = iuserService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto request)
        {
            try
            {
                var user = await _userService.RegisterAsync(request);
                return Ok(new { message = "User registered successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            try
            {
                var token = await _userService.LoginAsync(request);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    } 
}