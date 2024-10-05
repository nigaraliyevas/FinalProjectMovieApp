using AutoMapper;
using MovieApp.Application.Dtos.CommentDtos;
using MovieApp.Application.Dtos.MovieDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Profiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<MovieCreateDto, Movie>();
            CreateMap<CommentCreateDto, Comment>();
            //.ForMember(dest => dest.MovieSlider, opt => opt.MapFrom(src => new MovieSlider { Id = src.MovieSliderId }))
            //.ForMember(dest => dest.MovieActors, opt => opt.MapFrom(src => src.ActorIds.Select(id => new MovieActor { ActorId = id }).ToList()))
            //.ForMember(dest => dest.MovieTags, opt => opt.MapFrom(src => src.TagIds.Select(id => new MovieTag { TagId = id }).ToList()))
            //.ForMember(dest => dest.MovieGenres, opt => opt.MapFrom(src => src.GenreIds.Select(id => new MovieGenre { GenreId = id }).ToList()))
            //.ForMember(dest => dest.OriginalLanguages, opt => opt.MapFrom(src => src.LanguageIds.Select(id => new OriginalLanguage { Id = id }).ToList()))
            //.ForMember(dest => dest.MovieCountries, opt => opt.MapFrom(src => src.CountryIds.Select(id => new MovieCountry { CountryId = id }).ToList()));
        }
    }
}
