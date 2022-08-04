using AutoMapper;
using FortGames.Domain.Entities;
using FortGames.Infrastructure;
using FortGames.Services.Abstracts;
using Microsoft.EntityFrameworkCore;

namespace FortGames.Services
{
    public class FortGamesService : IFortGamesService
    {
        private readonly DatabaseContext _databaseContext;
        private IMapper _mapper;
        private readonly IDbContextFactory<DatabaseContext> _dbContextFactory;

        public FortGamesService(DatabaseContext databaseContext, IMapper mapper, IDbContextFactory<DatabaseContext> dbContextFactory)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
            _dbContextFactory = dbContextFactory;
        }

        #region Post
        public async Task<Company> AddCompany(Company company)
        {
            var result = await _databaseContext.Companies.AddAsync(company);
            await _databaseContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Game> AddGame(Game game)
        {
            var result = await _databaseContext.Games.AddAsync(game);
            await _databaseContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Genre> AddGenre(Genre genre)
        {
            var result = await _databaseContext.Genres.AddAsync(genre);
            await _databaseContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Mode> AddMode(Mode mode)
        {
            var result = await _databaseContext.Modes.AddAsync(mode);
            await _databaseContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Platform> AddPlatform(Platform platform)
        {
            var result = await _databaseContext.Platforms.AddAsync(platform);
            await _databaseContext.SaveChangesAsync();
            return result.Entity;
        }
        #endregion

        #region Delete
        public async Task<int> DeleteCompany(int id)
        {
            var company = await _databaseContext.Companies.FindAsync(id);
            _databaseContext.Companies.Remove(company);
            return await _databaseContext.SaveChangesAsync();
        }

        public async Task<int> DeleteGame(int id)
        {
            var game = await _databaseContext.Games.FindAsync(id);
            _databaseContext.Games.Remove(game);
            return await _databaseContext.SaveChangesAsync();
        }

        public async Task<int> DeleteGenre(int id)
        {
            var genre = await _databaseContext.Genres.FindAsync(id);
            _databaseContext.Genres.Remove(genre);
            return await _databaseContext.SaveChangesAsync();
        }

        public async Task<int> DeleteMode(int id)
        {
            var mode = await _databaseContext.Modes.FindAsync(id);
            _databaseContext.Modes.Remove(mode);
            return await _databaseContext.SaveChangesAsync();
        }

        public async Task<int> DeletePlatform(int id)
        {
            var platform = await _databaseContext.Platforms.FindAsync(id);
            _databaseContext.Platforms.Remove(platform);
            return await _databaseContext.SaveChangesAsync();
        }
        #endregion

        #region Get
        public async Task<IEnumerable<Company>> GetCompanies()
        {
            return await _databaseContext.Companies.ToListAsync();
        }

        public async Task<Game> GetGame(int id)
        {
            return await _databaseContext.Games.FindAsync(id);
        }

        public async Task<IEnumerable<Game>> GetGames()
        {
            return await _databaseContext.Games.Include(g => g.Company).ToListAsync();
        }

        public async Task<IEnumerable<Genre>> GetGenres()
        {
            return await _databaseContext.Genres.ToListAsync();
        }

        public async Task<IEnumerable<Mode>> GetModes()
        {
            return await _databaseContext.Modes.ToListAsync();
        }

        public async Task<IEnumerable<Platform>> GetPlatforms()
        {
            return await _databaseContext.Platforms.ToListAsync();
        }
        #endregion
    }
}
