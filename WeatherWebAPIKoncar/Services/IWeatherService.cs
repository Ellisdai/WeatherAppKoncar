using WeatherWebAPIKoncar.DTOs.Weather;

namespace WeatherWebAPIKoncar.Services
{
    public interface IWeatherService
    {
        Task<WeatherResponseDto> GetCurrentWeatherAsync(double lat, double lon);
        Task<ForecastResponseDto> GetForecastAsync(string City);
    }
}
