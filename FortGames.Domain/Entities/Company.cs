namespace FortGames.Domain.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public ICollection<Game> Games { get; set; }
    }
}
