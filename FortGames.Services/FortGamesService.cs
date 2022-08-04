﻿using AutoMapper;
using FortGames.Domain.Entities;
using FortGames.Domain.Models;
using FortGames.Infrastructure;
using FortGames.Services.Abstracts;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;

namespace FortGames.Services
{
    public class FortGamesService : IFortGamesService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
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
            return await _databaseContext.Games.Include(g => g.Company).Include(g => g.Genres).Include(g => g.Modes).Include(g => g.Platforms).FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<IEnumerable<GameModel>> GetGames()
        {
            var games = await _databaseContext.Games.Include(g => g.Company).Include(g => g.Genres).Include(g => g.Modes).Include(g => g.Platforms).ToListAsync();
            return _mapper.Map<IEnumerable<GameModel>>(games);
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

        #region Patch
        public async Task<Company> EditCompany(int id, JsonPatchDocument company)
        {
            var result = await _databaseContext.Companies.FindAsync(id);
            if (result != null)
            {
                company.ApplyTo(result);
                await _databaseContext.SaveChangesAsync();
            }
            return result;
        }

        public async Task<Genre> EditGenre(int id, JsonPatchDocument genre)
        {
            var result = await _databaseContext.Genres.FindAsync(id);
            if (result != null)
            {
                genre.ApplyTo(result);
                await _databaseContext.SaveChangesAsync();
            }
            return result;
        }

        public async Task<Mode> EditMode(int id, JsonPatchDocument mode)
        {
            var result = await _databaseContext.Modes.FindAsync(id);
            if (result != null)
            {
                mode.ApplyTo(result);
                await _databaseContext.SaveChangesAsync();
            }
            return result;
        }

        public async Task<Platform> EditPlatform(int id, JsonPatchDocument platform)
        {
            var result = await _databaseContext.Platforms.FindAsync(id);
            if (result != null)
            {
                platform.ApplyTo(result);
                await _databaseContext.SaveChangesAsync();
            }
            return result;
        }

        public async Task<Game> EditGame(int id, JsonPatchDocument game)
        {
            var result = await _databaseContext.Games.FindAsync(id);
            if (result != null)
            {
                game.ApplyTo(result);
                await _databaseContext.SaveChangesAsync();
            }
            return result;
        }

        #endregion

        #region Put
        public async Task<Company> UpdateCompany(CompanyModel model)
        {
            var company = await _databaseContext.Companies.FirstOrDefaultAsync(c => c.Id == model.Id);

            _mapper.Map(model, company);
            _databaseContext.Companies.Update(company);

            await _databaseContext.SaveChangesAsync();
            return company;
        }

        public async Task<Genre> UpdateGenre(GenreModel model)
        {
            var genre = await _databaseContext.Genres.FirstOrDefaultAsync(g => g.Id == model.Id);

            _mapper.Map(model, genre);
            _databaseContext.Genres.Update(genre);

            await _databaseContext.SaveChangesAsync();
            return genre;
        }

        public async Task<Mode> UpdateMode(ModeModel model)
        {
            var mode = await _databaseContext.Modes.FirstOrDefaultAsync(m => m.Id == model.Id);

            _mapper.Map(model, mode);
            _databaseContext.Modes.Update(mode);

            await _databaseContext.SaveChangesAsync();
            return mode;
        }

        public async Task<Platform> UpdatePlatform(PlatformModel model)
        {
            var platform = await _databaseContext.Platforms.FirstOrDefaultAsync(p => p.Id == model.Id);

            _mapper.Map(model, platform);
            _databaseContext.Platforms.Update(platform);

            await _databaseContext.SaveChangesAsync();
            return platform;
        }

        public async Task<Game> UpdateGame(GameModel model)
        {
            await ClearGameRelationships(model.Id);

            var game = await _databaseContext.Games.FirstOrDefaultAsync(g => g.Id == model.Id);

            _mapper.Map(model, game);
            _databaseContext.Games.Update(game);

            await _databaseContext.SaveChangesAsync();
            return game;
        }

        #endregion

        private async Task<int> ClearGameRelationships(int id)
        {
            using var context = await _dbContextFactory.CreateDbContextAsync();

            var game = await context.Games
                
                .Include(g => g.Genres)
                .Include(g => g.Modes)
                .Include(g => g.Platforms)
                .FirstOrDefaultAsync(g => g.Id == id);

            game.Genres.Clear();
            game.Modes.Clear();
            game.Platforms.Clear();

            return await context.SaveChangesAsync();
        }
    }
}
