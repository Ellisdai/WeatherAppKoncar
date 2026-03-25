using Microsoft.AspNetCore.Identity.Data;
using WeatherWebAPIKoncar.DTOs.Auth;
using WeatherWebAPIKoncar.Models;

namespace WeatherWebAPIKoncar.Services
{
    public interface IuserService
    {
        Task<User> RegisterAsync(RegisterDto request);
        Task<string> LoginAsync(LoginDto request);
        Task<User> GetByIdAsync(Guid id);
    }
}
