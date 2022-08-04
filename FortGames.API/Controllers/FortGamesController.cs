using FortGames.Domain.Entities;
using FortGames.Services.Abstracts;
using Microsoft.AspNetCore.Http;
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

        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _fortGamesService.GetGenres();
            return Ok(genres);
        }

        [HttpGet("modes")]
        public async Task<IActionResult> GetModes()
        {
            var modes = await _fortGamesService.GetModes();
            return Ok(modes);
        }

        [HttpGet("platforms")]
        public async Task<IActionResult> GetPlatforms()
        {
            var platforms = await _fortGamesService.GetPlatforms();
            return Ok(platforms);
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
        [HttpDelete("company/{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            return Ok(await _fortGamesService.DeleteCompany(id));
        }

        [HttpDelete("genre/{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            return Ok(await _fortGamesService.DeleteGenre(id));
        }

        [HttpDelete("mode/{id}")]
        public async Task<IActionResult> DeleteMode(int id)
        {
            return Ok(await _fortGamesService.DeleteMode(id));
        }

        [HttpDelete("platform/{id}")]
        public async Task<IActionResult> DeletePlatform(int id)
        {
            return Ok(await _fortGamesService.DeletePlatform(id));
        }

        [HttpDelete("game/{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            return Ok(await _fortGamesService.DeleteGame(id));
        }
        #endregion
    }
}
