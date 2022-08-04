using FortGames.Domain.Entities;
using FortGames.Domain.Extensions;
using FortGames.Infrastructure.Extensions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FortGames.Infrastructure
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Mode> Modes { get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<Company> Companies { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options ) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); //base = origine, + quello che gli diciamo
            //builder.Entity<GameGenre>(entity => entity.HasKey(e => new { e.GenreId, e.GameId })); //fluent API
            builder.Seed();
        }
    }
}
