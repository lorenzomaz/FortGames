namespace FortGames.Domain.Entities
{
    public class PagedResponse<T>
    {
        public IEnumerable<T> Results { get; set; }
        public int Total { get; set; }
    }
}
