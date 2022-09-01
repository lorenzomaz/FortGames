using AutoMapper;
using FortGames.Domain.Entities;
using FortGames.Domain.Models;
using FortGames.Infrastructure;
using FortGames.Services.Abstracts;
using FortGames.Shared.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace FortGames.Services
{
    public class AccountService : IAccountService
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        private readonly IDbContextFactory<DatabaseContext> _dbContextFactory;
        public async Task<PagedResponse<UserModel>> GetUsers(string search, int index, int size, string sortBy, string sortDir)
        {
            Expression<Func<ApplicationUser, bool>> predicate = c => true;

            if (!string.IsNullOrEmpty(search))
            {
                predicate = c => c.FirstName.Contains(search);
            }

            var query = _databaseContext.Users.Filter(predicate);

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
