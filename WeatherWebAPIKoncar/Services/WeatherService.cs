using Newtonsoft.Json.Linq;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using WeatherWebAPIKoncar.DTOs.Weather;

namespace WeatherWebAPIKoncar.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly IHttpClientFactory _http;
        private readonly IConfiguration _config;

        public WeatherService(IHttpClientFactory http, IConfiguration config)
        {
            _http = http;
            _config = config;
        }

        public async Task<WeatherResponseDto> GetCurrentWeatherAsync(double lat, double lon)
        {
            var apiKey = _config["OpenWeather:ApiKey"];
            var client = _http.CreateClient();
            var response = await client.GetStringAsync($"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}&units=metric");
            var json = JObject.Parse(response);

            return new WeatherResponseDto
            {
                City = json["name"].ToString(),
                Temperature = json["main"]["temp"].ToObject<double>(),
                Weather = json["weather"][0]["main"].ToString(),
                Humidity = json["main"]["humidity"].ToObject<int>(),
                WindSpeed = json["wind"]["speed"].ToObject<double>()
            };
        }

        public async Task<ForecastResponseDto> GetForecastAsync(string city)
        {
            var apiKey = _config["OpenWeather:ApiKey"];
            var client = _http.CreateClient();
            var response = await client.GetStringAsync($"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={apiKey}&units=metric");

            var json = JObject.Parse(response);
            var list = json["list"].ToObject<List<JObject>>();

            var forecasts = list
                .GroupBy(x => DateTime.Parse(x["dt_txt"].ToString()).Date)
                .Select(g => new ForecastItemDto
                {
                    Date = g.Key,
                    Weather = g.First()["weather"][0]["main"].ToString(),
                    Temperature = g.Average(x => x["main"]["temp"].ToObject<double>()),
                    Humidity = (int)g.Average(x => x["main"]["humidity"].ToObject<int>()),
                    WindSpeed = g.Average(x => x["wind"]["speed"].ToObject<double>())
                })
                .Take(5)
                .ToList();

            return new ForecastResponseDto
            {
                City = json["city"]["name"].ToString(),
                Forecasts = forecasts
            };
        }
    }
}
