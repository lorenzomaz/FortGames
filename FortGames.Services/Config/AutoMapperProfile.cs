using AutoMapper;
using FortGames.Domain.Entities;
using FortGames.Domain.Models;

namespace FortGames.Services.Config
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterModel, ApplicationUser>();
            CreateMap<ApplicationUser, UserModel>().ReverseMap();

        }
    }
}
