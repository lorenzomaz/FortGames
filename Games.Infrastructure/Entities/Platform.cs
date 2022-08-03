using System.ComponentModel.DataAnnotations;

namespace Games.Infrastructure.Entities
{
    public class Platform
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }
        public ICollection<Game> Games { get; set; }
    }
}
