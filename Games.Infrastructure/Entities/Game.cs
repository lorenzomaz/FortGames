using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Games.Infrastructure.Entities
{
    public class Game
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Title { get; set; }
        public DateTime Release { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        public ICollection<GameGenre> GameGenre { get; set; }
    }
}
