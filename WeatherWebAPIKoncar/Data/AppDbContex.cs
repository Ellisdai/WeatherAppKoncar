using Microsoft.EntityFrameworkCore;
using WeatherWebAPIKoncar.Models;


namespace WeatherWebAPIKoncar.Data;
public class AppDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Search> Searches => Set<Search>();
    public AppDbContext(DbContextOptions<AppDbContext> options) 
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}
