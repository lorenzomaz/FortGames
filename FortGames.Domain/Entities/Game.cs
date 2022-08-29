using System.ComponentModel.DataAnnotations;

namespace FortGames.Domain.Entities
{
    public class Game
    {
        public int Id { get; set; }
        public byte[] Logo { get; set; }

        [StringLength(100)]
        public string Title { get; set; }

        public DateTime Release { get; set; }
        public string Description { get; set; }
        public float Rating { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public ICollection<Mode> Modes { get; set; }
        public ICollection<Platform> Platforms { get; set; }
        public ICollection<Genre> Genres { get; set; }
    }
}
