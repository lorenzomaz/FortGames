using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FortGames.Services.Models
{
    public class GameModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Release { get; set; }
        public string Description { get; set; }

        public ICollection<GenreModel> Genre { get; set; }
    }
}
