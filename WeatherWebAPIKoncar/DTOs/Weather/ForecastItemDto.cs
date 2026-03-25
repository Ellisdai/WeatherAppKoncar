namespace WeatherWebAPIKoncar.DTOs.Weather
{
    public class ForecastItemDto
    {
        public DateTime Date { get; set; }
        public string Weather { get; set; }
        public double Temperature { get; set; }

        public int Humidity { get; set; }

        public double WindSpeed { get; set; }
    }

    public class ForecastResponseDto
    {
        public string City { get; set; }
        public List<ForecastItemDto> Forecasts { get; set; }
    }
}
