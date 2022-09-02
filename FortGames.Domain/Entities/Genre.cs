using System.ComponentModel.DataAnnotations;

namespace FortGames.Domain.Entities
{
    public class Genre
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }
        public ICollection<Game> Games { get; set; }
    }
}
