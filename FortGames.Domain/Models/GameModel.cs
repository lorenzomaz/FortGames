namespace FortGames.Domain.Models
{
    public class GameModel
    {
        public int Id { get; set; }
        public string Logo { get; set; }
        public string Title { get; set; }
        public DateTime Release { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public int CompanyId { get; set; }
        public CompanyModel Company { get; set; }

        public IEnumerable<GenreModel> Genres { get; set; }
        public IEnumerable<ModeModel> Modes { get; set; }
        public IEnumerable<PlatformModel> Platforms { get; set; }
    }
}
