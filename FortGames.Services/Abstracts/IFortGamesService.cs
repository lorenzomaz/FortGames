﻿using FortGames.Domain.Entities;
using FortGames.Domain.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace FortGames.Services.Abstracts
{
    public interface IFortGamesService
    {
        Task<IEnumerable<Company>> GetCompanies();
        Task<IEnumerable<Genre>> GetGenres();
        Task<IEnumerable<Mode>> GetModes();
        Task<IEnumerable<Platform>> GetPlatforms();
        Task<IEnumerable<GameModel>> GetGames();
        Task<Game> GetGame(int id);

        Task<Company> AddCompany(Company company);
        Task<Genre> AddGenre(Genre genre);
        Task<Mode> AddMode(Mode mode);
        Task<Platform> AddPlatform(Platform platform);
        Task<Game> AddGame(Game game);

        Task<Company> EditCompany(int id, JsonPatchDocument company);
        Task<Genre> EditGenre(int id, JsonPatchDocument genre);
        Task<Mode> EditMode(int id, JsonPatchDocument mode);
        Task<Platform> EditPlatform(int id, JsonPatchDocument platform);
        Task<Game> EditGame(int id, JsonPatchDocument game);

        Task<Company> UpdateCompany(CompanyModel model);
        Task<Genre> UpdateGenre(GenreModel model);
        Task<Mode> UpdateMode(ModeModel model);
        Task<Platform> UpdatePlatform(PlatformModel model);
        Task<Game> UpdateGame(GameModel model);

        Task<int> DeleteCompany(int id);
        Task<int> DeleteGenre(int id);
        Task<int> DeleteMode(int id);
        Task<int> DeletePlatform(int id);
        Task<int> DeleteGame(int id);
    }
}
