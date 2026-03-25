namespace WeatherWebAPIKoncar.DTOs.Weather
{
    public class WeatherResponseDto
    {
        public string City { get; set; }
        public double Temperature { get; set; }
        public string Weather { get; set; }

        public int Humidity { get; set; }

        public double WindSpeed { get; set; }
    }
}
