using FortGames.Domain.Enums;

namespace FortGames.Domain.Models
{
    public class FilterGameModel
    {
        public int Id { get; set; }
        public GameFilterType Type { get; set; }
    }
}