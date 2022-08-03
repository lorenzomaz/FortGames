using FortGames.Domain.Entities;

namespace FortGames.Services.Abstracts
{
    public interface IFortGamesService
    {
        Task<IEnumerable<Company>> GetCompanies();
        Task<IEnumerable<Genre>> GetGenres();
        Task<IEnumerable<Mode>> GetModes();
        Task<IEnumerable<Platform>> GetPlatforms();
        Task<IEnumerable<Game>> GetGames();
        Task<Game> GetGame(int id);

        Task<Company> AddCompany(Company company);
        Task<Genre> AddGenre(Genre genre);
        Task<Mode> AddMode(Mode mode);
        Task<Platform> AddPlatform(Platform platform);
        Task<Game> AddGame(Game game);

        Task<int> DeleteCompany(int id);
        Task<int> DeleteGenre(int id);
        Task<int> DeleteMode(int id);
        Task<int> DeletePlatform(int id);
        Task<int> DeleteGame(int id);
    }
}
