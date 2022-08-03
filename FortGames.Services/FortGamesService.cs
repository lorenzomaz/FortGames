using FortGames.Domain.Entities;
using FortGames.Infrastructure;
using FortGames.Services.Abstracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FortGames.Services
{
    public class FortGamesService : IFortGamesService
    {
        private readonly DatabaseContext _databaseContext;

        public FortGamesService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        #region Add
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

        public Task<Game> DeleteGame(Game game)
        {
            throw new NotImplementedException();
        }

        public Task<Genre> DeleteGenre(Genre genre)
        {
            throw new NotImplementedException();
        }

        public Task<Mode> DeleteMode(Mode mode)
        {
            throw new NotImplementedException();
        }

        public Task<Platform> DeletePlatform(Platform platform)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region Get
        public async Task<IEnumerable<Company>> GetCompanies()
        {
            return await _databaseContext.Companies.ToListAsync();
        }

        public async Task<Game> GetGame(int id)
        {
            return await _databaseContext.Games.FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<IEnumerable<Game>> GetGames()
        {
            return await _databaseContext.Games.ToListAsync();
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
