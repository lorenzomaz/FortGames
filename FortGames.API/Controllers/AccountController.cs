using AutoMapper;
using FortGames.Domain.Entities;
using FortGames.Domain.Models;
using FortGames.Shared.Extensions;
using FortGames.Shared.Constats;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FortGames.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        //ricorda di aggiungere IMapper mapper nella firma del costruttore quando aggiungerai register, delete, get users e proprio account ('username')
        public AccountController(UserManager<ApplicationUser> userManager, IConfiguration configuration, IMapper mapper)
        {
            _userManager = userManager;
            _configuration = configuration;
            _mapper = mapper;
        }

        private async Task<IList<Claim>> GetClaims(ApplicationUser user)
        {
            var claims = new List<Claim>()
            {
                new(ClaimTypes.NameIdentifier, user.Id),
                new(ClaimTypes.Email, user.Email),
                new("username", user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var item in roles)
            {
                claims.Add(new(ClaimTypes.Role, item));
            }
            return claims;
        }

        private async Task<string> GenerateToken(ApplicationUser user)
        {
            var claims = await GetClaims(user);
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppConfig:JwtKey")));
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!model.Email.IsValidEmail())
            {
                return Unauthorized("Access Denied");
            }
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return Unauthorized("Access Denied"); //mail non trovata
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return Unauthorized("Access Denied"); //account non confermato
            }

            if (await _userManager.IsLockedOutAsync(user))
            {
                return Unauthorized("Access Blocked");
            }

            if (!await _userManager.CheckPasswordAsync(user, model.Password))
            {
                await _userManager.AccessFailedAsync(user);

                if (await _userManager.IsLockedOutAsync(user))
                {
                    return Unauthorized("Access Blocked");
                }
                return Unauthorized("Access Denied");
            }
            await _userManager.ResetAccessFailedCountAsync(user);

            return Ok(new { token = await GenerateToken(user) });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            //ModelState = errori da mostrare
            var entityUser = Activator.CreateInstance<ApplicationUser>();
            var user = _mapper.Map(model, entityUser);

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, Identity.Roles.User);
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }

            return NoContent();
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetUser(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            return Ok(_mapper.Map<UserModel>(user));
        }

        //[Authorize(Roles = Identity.Roles.Admin)]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var userId = User.GetUserId();
            var users = await _userManager.Users.Where(u => u.Id != userId).ToListAsync();
            return Ok(_mapper.Map<IEnumerable<UserModel>>(users));
        }
    }
}
