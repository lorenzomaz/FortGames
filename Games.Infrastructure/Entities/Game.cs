using System.ComponentModel.DataAnnotations;
namespace Games.Infrastructure.Entities
{
    public class Game
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Title { get; set; }
        public DateTime Release { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Mode> Modes { get; set; }
        public ICollection<Platform> Platforms { get; set; }
        public ICollection<Genre> Genres { get; set; }
    }
}
