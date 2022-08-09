using FortGames.Domain.Entities;
using FortGames.Domain.Models;
using FortGames.Services.Abstracts;
using FortGames.Shared.Constats;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace FortGames.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class FortGamesController : ControllerBase
    {
        private readonly IFortGamesService _fortGamesService;

        public FortGamesController(IFortGamesService fortGamesService)
        {
            _fortGamesService = fortGamesService;
        }

        #region Get
        [HttpGet("companies")]
        public async Task<IActionResult> GetCompanies()
        {
            var companies = await _fortGamesService.GetCompanies();
            return Ok(companies);
        }

        [HttpGet("companies/{id}")]
        public async Task<IActionResult> GetCompanyRelatedGames(int id)
        {
            var companies = await _fortGamesService.GetCompanyRelatedGames(id);
            return Ok(companies);
        }

        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _fortGamesService.GetGenres();
            return Ok(genres);
        }

        [HttpGet("genres/{id}")]
        public async Task<IActionResult> GetGenreRelatedGames(int id)
        {
            var genre = await _fortGamesService.GetGenreRelatedGames(id);
            return Ok(genre);
        }

        [HttpGet("modes")]
        public async Task<IActionResult> GetModes()
        {
            var modes = await _fortGamesService.GetModes();
            return Ok(modes);
        }

        [HttpGet("modes/{id}")]
        public async Task<IActionResult> GetModeRelatedGames(int id)
        {
            var mode = await _fortGamesService.GetModeRelatedGames(id);
            return Ok(mode);
        }

        [HttpGet("platforms")]
        public async Task<IActionResult> GetPlatforms()
        {
            var platforms = await _fortGamesService.GetPlatforms();
            return Ok(platforms);
        }

        [HttpGet("platforms/{id}")]
        public async Task<IActionResult> GetPlatformRelatedGames(int id)
        {
            var platform = await _fortGamesService.GetPlatformRelatedGames(id);
            return Ok(platform);
        }

        [HttpGet("games/{id}")]
        public async Task<IActionResult> GetGame(int id)
        {
            var game = await _fortGamesService.GetGame(id);
            return Ok(game);
        }

        [HttpGet("games")]
        public async Task<IActionResult> GetGames()
        {
            var games = await _fortGamesService.GetGames();
            return Ok(games);
        }

        [HttpGet("games/list")]
        public async Task<IActionResult> GetGamesList( string? search = null, int index = 0, int size = 10, string? sortBy = nameof(Game.Title), string? sortDir = "")
        {
            var games = await _fortGamesService.GetGamesList(search, index, size, sortBy, sortDir);
            return Ok(games);
        }
        #endregion

        #region Post
        [HttpPost("company")]
        public async Task<IActionResult> AddCompany(Company company)
        {
            return Ok(await _fortGamesService.AddCompany(company));
        }

        [HttpPost("genre")]
        public async Task<IActionResult> AddGenre(Genre genre)
        {
            return Ok(await _fortGamesService.AddGenre(genre));
        }

        [HttpPost("mode")]
        public async Task<IActionResult> AddMode(Mode mode)
        {
            return Ok(await _fortGamesService.AddMode(mode));
        }

        [HttpPost("platform")]
        public async Task<IActionResult> AddPlatform(Platform platform)
        {
            return Ok(await _fortGamesService.AddPlatform(platform));
        }

        [HttpPost("game")]
        public async Task<IActionResult> AddGame(Game game)
        {
            return Ok(await _fortGamesService.AddGame(game));
        }
        #endregion

        #region Delete
        [Authorize(Roles = Identity.Roles.Admin)]
        [HttpDelete("company/{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            return Ok(await _fortGamesService.DeleteCompany(id));
        }

        [Authorize(Roles = Identity.Roles.Admin)]
        [HttpDelete("genre/{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            return Ok(await _fortGamesService.DeleteGenre(id));
        }

        [Authorize(Roles = Identity.Roles.Admin)]
        [HttpDelete("mode/{id}")]
        public async Task<IActionResult> DeleteMode(int id)
        {
            return Ok(await _fortGamesService.DeleteMode(id));
        }

        [Authorize(Roles = Identity.Roles.Admin)]
        [HttpDelete("platform/{id}")]
        public async Task<IActionResult> DeletePlatform(int id)
        {
            return Ok(await _fortGamesService.DeletePlatform(id));
        }

        [Authorize(Roles = Identity.Roles.Admin)]
        [HttpDelete("game/{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            return Ok(await _fortGamesService.DeleteGame(id));
        }
        #endregion

        #region Patch
        [HttpPatch("company/{id}")]
        public async Task<IActionResult> EditCompany(int id,[FromBody] JsonPatchDocument company)
        {
            return Ok(await _fortGamesService.EditCompany(id, company));
        }

        [HttpPatch("genre/{id}")]
        public async Task<IActionResult> EditGenre(int id, [FromBody] JsonPatchDocument genre)
        {
            return Ok(await _fortGamesService.EditGenre(id, genre));
        }

        [HttpPatch("mode/{id}")]
        public async Task<IActionResult> EditMode(int id, [FromBody] JsonPatchDocument mode)
        {
            return Ok(await _fortGamesService.EditMode(id, mode));
        }

        [HttpPatch("platform/{id}")]
        public async Task<IActionResult> EditPlatform(int id, [FromBody] JsonPatchDocument platform)
        {
            return Ok(await _fortGamesService.EditPlatform(id, platform));
        }

        [HttpPatch("game/{id}")]
        public async Task<IActionResult> EditGame(int id, [FromBody] JsonPatchDocument game)
        {
            return Ok(await _fortGamesService.EditGame(id, game));
        }

        #endregion

        #region Put
        [HttpPut("companies")]
        public async Task<IActionResult> UpdateCompany([FromBody] CompanyModel model)
        {
            return Ok(await _fortGamesService.UpdateCompany(model));
        }

        [HttpPut("genres")]
        public async Task<IActionResult> UpdateGenre([FromBody] GenreModel model)
        {
            return Ok(await _fortGamesService.UpdateGenre(model));
        }

        [HttpPut("modes")]
        public async Task<IActionResult> UpdateModes([FromBody] ModeModel model)
        {
            return Ok(await _fortGamesService.UpdateMode(model));
        }

        [HttpPut("platforms")]
        public async Task<IActionResult> UpdatePlatforms([FromBody] PlatformModel model)
        {
            return Ok(await _fortGamesService.UpdatePlatform(model));
        }

        [HttpPut("games")]
        public async Task<IActionResult> UpdateGame([FromBody] GameModel model)
        {
            return Ok(await _fortGamesService.UpdateGame(model));
        }

        #endregion
    }
}
