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

            CreateMap<ApplicationUser, UserModel>();

            CreateMap<Game, GameModel>();
            //.ForMember(d => d.Logo, opt => opt.MapFrom(src => Convert.ToBase64String(src.Logo)));
            //.ForMember(d => d.Genres, opt => opt.MapFrom(src => src.Genres.Select(g => g.Id)))
            //.ForMember(d => d.Modes, opt => opt.MapFrom(src => src.Modes.Select(m => m.Id)))
            //.ForMember(d => d.Platforms, opt => opt.MapFrom(src => src.Platforms.Select(p => p.Id)));

            CreateMap<GameModel, Game>();
                //.ForMember(d => d.Logo, opt => opt.MapFrom(src => Convert.FromBase64String(src.Logo)));

            CreateMap<Genre, GenreModel>().ReverseMap();
            CreateMap<Mode, ModeModel>().ReverseMap();
            CreateMap<Platform, PlatformModel>().ReverseMap();
            CreateMap<Company, CompanyModel>().ReverseMap();
        }
    }
}