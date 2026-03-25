using System.ComponentModel.DataAnnotations.Schema;

namespace WeatherWebAPIKoncar.Models
{
    public class Search
    {
        public Guid Id { get; set; }
        public string City { get; set; } = "";
        public DateTime SearchDate { get; set; } = DateTime.UtcNow;
        public string WeatherCondition { get; set; } = "";

        [ForeignKey("User")]
        public Guid UserId { get; set; }
    }
}
