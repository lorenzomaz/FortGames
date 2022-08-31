using AutoMapper;
using FortGames.Domain.Entities;
using FortGames.Domain.Enums;
using FortGames.Domain.Models;
using FortGames.Infrastructure;
using FortGames.Services.Abstracts;
using FortGames.Shared.Extensions;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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
            if (game.Genres != null)
                _databaseContext.Genres.AttachRange(game.Genres);
            if (game.Modes != null)
                _databaseContext.Modes.AttachRange(game.Modes);
            if (game.Platforms != null)
                _databaseContext.Platforms.AttachRange(game.Platforms);

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
        public async Task<IEnumerable<CompanyModel>> GetCompanies() //Da MODIFICARE seguendo GameList per il pagination backend
        {
            var companies = await _databaseContext.Companies.ToListAsync();
            return _mapper.Map<IEnumerable<CompanyModel>>(companies);
        }

        public async Task<IEnumerable<GameModel>> GetCompanyRelatedGames(int id)
        {
            var company = await _databaseContext.Companies.Include(g => g.Games).FirstOrDefaultAsync(c => c.Id == id);
            return _mapper.Map<IEnumerable<GameModel>>(company.Games);
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

        public async Task<PagedResponse<GameModel>> GetGamesList(string search, int index, int size, string sortBy, string sortDir, IEnumerable<FilterGameModel> filters)
        {
            Expression<Func<Game, bool>> predicate = g => true;

            if (!string.IsNullOrEmpty(search))
            {
                predicate = g => g.Title.Contains(search);
            }
            // posso omettere l'include
            var query = _databaseContext.Games.Include(g => g.Company).Include(g => g.Genres).Include(g => g.Modes).Include(g => g.Platforms).Filter(predicate);

            if (filters.Any())
            {
                var platforms = filters.Where(p => p.Type == GameFilterType.Platforms).Select(p => p.Id).ToList();
                var genres = filters.Where(g => g.Type == GameFilterType.Genres).Select(g => g.Id).ToList();
                var modes = filters.Where(m => m.Type == GameFilterType.Modes).Select(m => m.Id).ToList();
                var companies = filters.Where(c => c.Type == GameFilterType.Companies).Select(c => c.Id).ToList();
                //Per le altre pagination, servirà sicuramente il where
                query = query.Where(g =>
                    g.Platforms.Select(p => p.Id).Any(id => platforms.Contains(id)) ||
                    g.Genres.Select(g => g.Id).Any(id => genres.Contains(id)) ||
                    g.Modes.Select(m => m.Id).Any(id => modes.Contains(id)) ||
                    companies.Contains(g.CompanyId));
            }

            var count = await query.CountAsync();
            var games = await query
                .OrderBy(sortBy, sortDir)
                .Skip(index * size)
                .Take(size)
                .ToListAsync();

            return new() { Results = _mapper.Map<IEnumerable<GameModel>>(games), Total = count };
        }

        public async Task<IEnumerable<GenreModel>> GetGenres()
        {
            var genres = await _databaseContext.Genres.ToListAsync();
            return _mapper.Map<IEnumerable<GenreModel>>(genres);
        }

        public async Task<IEnumerable<GameModel>> GetGenreRelatedGames(int id)
        {
            var genre = await _databaseContext.Genres.Include(g => g.Games).ThenInclude(g => g.Company).FirstOrDefaultAsync(g => g.Id == id);
            return _mapper.Map<IEnumerable<GameModel>>(genre.Games);
        }

        public async Task<IEnumerable<ModeModel>> GetModes()
        {
            var modes = await _databaseContext.Modes.ToListAsync();
            return _mapper.Map<IEnumerable<ModeModel>>(modes);
        }

        public async Task<IEnumerable<GameModel>> GetModeRelatedGames(int id)
        {
            var mode = await _databaseContext.Modes.Include(m => m.Games).ThenInclude(m => m.Company).FirstOrDefaultAsync(m => m.Id == id);
            return _mapper.Map<IEnumerable<GameModel>>(mode.Games);
        }

        public async Task<IEnumerable<PlatformModel>> GetPlatforms()
        {
            var platforms = await _databaseContext.Platforms.ToListAsync();
            return _mapper.Map<IEnumerable<PlatformModel>>(platforms);
        }

        public async Task<IEnumerable<GameModel>> GetPlatformRelatedGames(int id)
        {
            var platform = await _databaseContext.Platforms.Include(p => p.Games).ThenInclude(p => p.Company).FirstOrDefaultAsync(p => p.Id == id);
            return _mapper.Map<IEnumerable<GameModel>>(platform.Games);
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
            var game = await _databaseContext.Games
                .Include(g => g.Genres)
                .Include(g => g.Modes)
                .Include(g => g.Platforms)
                .FirstOrDefaultAsync(g => g.Id == model.Id);

            var currentGenres = game.Genres.ToList();
            var currentModes = game.Modes.ToList();
            var currentPlatforms = game.Platforms.ToList();

            var genres = _mapper.Map<IEnumerable<Genre>>(model.Genres);
            var modes = _mapper.Map<IEnumerable<Mode>>(model.Modes);
            var platforms = _mapper.Map<IEnumerable<Platform>>(model.Platforms);

            _mapper.Map(model, game);

            currentGenres.UpdateManyToMany(genres, g => g.Id);
            currentModes.UpdateManyToMany(modes, m => m.Id);
            currentPlatforms.UpdateManyToMany(platforms, p => p.Id);

            game.Genres = currentGenres;
            game.Modes = currentModes;
            game.Platforms = currentPlatforms;

            _databaseContext.Games.Update(game);

            await _databaseContext.SaveChangesAsync();
            return game;
        }

        #endregion
    }
}
