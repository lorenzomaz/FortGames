using FortGames.Domain.Entities;
using FortGames.Domain.Models;

namespace FortGames.Services.Abstracts
{
    public interface IAccountService
    {
        Task<PagedResponse<UserModel>> GetUsers(string search, int index, int size, string sortBy, string sortDir);
    }
}
