using Games.Infrastructure.Entities;
using Games.Infrastructure.Extensions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Games.Infrastructure
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Game> Games { get; set; }
        public DbSet<Genre> Genres { get; set; }

        public DbSet<GameGenre> GameGenres { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options ) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); //base = origine, + quello che gli diciamo
            builder.Entity<GameGenre>(entity => entity.HasKey(e => new { e.GenreId, e.GameId })); //fluent API
            builder.SeedData();
        }
    }
}
