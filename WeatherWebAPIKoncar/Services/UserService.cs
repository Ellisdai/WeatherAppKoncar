using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using WeatherWebAPIKoncar.Data;
using WeatherWebAPIKoncar.Models;
using WeatherWebAPIKoncar.DTOs.Auth;
using WeatherWebAPIKoncar.Helper;

namespace WeatherWebAPIKoncar.Services
{
    public class UserService : IuserService
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public UserService(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        public async Task<User> RegisterAsync(RegisterDto requset)
        {
            if (await _db.Users.AnyAsync(u => u.Email == requset.Email || u.UserName == requset.Username))
                throw new Exception("Email or Username already in use.");
            var user = new User
            {
                UserName = requset.Username,
                Email = requset.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(requset.Password)
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return user;
        }

        public async Task<string> LoginAsync(LoginDto request)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == request.Email || u.UserName == request.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                throw new Exception("Invalid email or password.");
            string token = JwtHelper.GenerateToken(user, _config["Jwt:Key"], int.Parse(_config["Jwt:ExpireMinutes"]));
            return token;
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            return await _db.Users.FindAsync(id) ?? throw new Exception("User not found.");
        }
    }
}
