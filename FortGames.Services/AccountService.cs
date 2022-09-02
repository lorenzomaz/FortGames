using AutoMapper;
using FortGames.Domain.Entities;
using FortGames.Domain.Models;
using FortGames.Infrastructure;
using FortGames.Services.Abstracts;
using FortGames.Shared.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq.Expressions;

namespace FortGames.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public AccountService(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<PagedResponse<UserModel>> GetUsers(string userId, string search, int index, int size, string sortBy, string sortDir)
        {
            Expression<Func<ApplicationUser, bool>> predicate = u => u.Id != userId;

            if (!string.IsNullOrEmpty(search))
            {
                predicate = u => u.Id != userId && u.UserName.Contains(search);
            }

            var query = _userManager.Users.Filter(predicate);

            var count = await query.CountAsync();
            var users = await query
                .OrderBy(sortBy, sortDir)
                .Skip(index * size)
                .Take(size)
                .ToListAsync();

            return new() { Results = _mapper.Map<IEnumerable<UserModel>>(users), Total = count };
        }
    }
}
