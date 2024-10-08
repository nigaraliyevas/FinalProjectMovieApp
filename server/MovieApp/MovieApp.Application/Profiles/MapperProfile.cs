using AutoMapper;
using MovieApp.Application.Dtos.ActorDtos;
using MovieApp.Application.Dtos.CommentDtos;
using MovieApp.Application.Dtos.CountryDtos;
using MovieApp.Application.Dtos.GenreDtos;
using MovieApp.Application.Dtos.MovieDtos;
using MovieApp.Application.Dtos.OriginalLanguageDtos;
using MovieApp.Application.Dtos.TagDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Profiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            //Comment
            CreateMap<CommentCreateDto, Comment>();

            //Actor
            CreateMap<ActorCreateDto, Actor>();
            CreateMap<ActorUpdateDto, Actor>();

            //Genre
            CreateMap<GenreCreateDto, Genre>();
            CreateMap<GenreUpdateDto, Genre>();

            //Country
            CreateMap<CountryCreateDto, Country>();
            CreateMap<CountryUpdateDto, Country>();

            //Tag
            CreateMap<TagCreateDto, Tag>();
            CreateMap<TagUpdateDto, Tag>();

            //OriginalLanguage
            CreateMap<OriginalLanguageCreateDto, OriginalLanguage>();
            CreateMap<OriginalLanguageUpdateDto, OriginalLanguage>();
            CreateMap<MovieCreateDto, Movie>()
                .ForMember(dest => dest.MovieActors, opt => opt.MapFrom(src => src.ActorIds.Select(id => new MovieActor { ActorId = id }).ToList()))
                .ForMember(dest => dest.MovieTags, opt => opt.MapFrom(src => src.TagIds.Select(id => new MovieTag { TagId = id }).ToList()))
                .ForMember(dest => dest.MovieGenres, opt => opt.MapFrom(src => src.GenreIds.Select(id => new MovieGenre { GenreId = id }).ToList()))
                .ForMember(dest => dest.MovieCountries, opt => opt.MapFrom(src => src.CountryIds.Select(id => new MovieCountry { CountryId = id }).ToList()))
                .AfterMap((src, dest) =>
                {
                    foreach (var movieActor in dest.MovieActors)
                    {
                        movieActor.MovieId = dest.Id;
                    }
                    foreach (var movieTag in dest.MovieTags)
                    {
                        movieTag.MovieId = dest.Id;
                    }
                    foreach (var movieGenre in dest.MovieGenres)
                    {
                        movieGenre.MovieId = dest.Id;
                    }
                    foreach (var movieCountry in dest.MovieCountries)
                    {
                        movieCountry.MovieId = dest.Id;
                    }
                })
                .ReverseMap();








            CreateMap<MovieUpdateDto, Movie>();
            //        .ForMember(dest => dest.MovieSlider, opt => opt.MapFrom(src => new MovieSlider { Id = src.MovieSliderId }))
            //        .ForMember(dest => dest.MovieActors, opt => opt.MapFrom(src => src.ActorIds.Select(id => new MovieActor { ActorId = id }).ToList()))
            //        .ForMember(dest => dest.MovieTags, opt => opt.MapFrom(src => src.TagIds.Select(id => new MovieTag { TagId = id }).ToList()))
            //        .ForMember(dest => dest.MovieGenres, opt => opt.MapFrom(src => src.GenreIds.Select(id => new MovieGenre { GenreId = id }).ToList()))
            //        .ForMember(dest => dest.OriginalLanguage, opt => opt.MapFrom(src => src.LanguageIds.Select(id => new OriginalLanguage { Id = id }).ToList()))
            //        .ForMember(dest => dest.MovieCountries, opt => opt.MapFrom(src => src.CountryIds.Select(id => new MovieCountry { CountryId = id }).ToList()));
            //.ForMember(dest => dest.Comments, opt => opt.Ignore());  // Assuming Comments will be added later
            //}
        }
    }

}