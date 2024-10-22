using MovieApp.Application.Dtos.ActorDtos;
using MovieApp.Application.Dtos.CommentDtos;
using MovieApp.Application.Dtos.CountryDtos;
using MovieApp.Application.Dtos.GenreDtos;
using MovieApp.Application.Dtos.TagDtos;

namespace MovieApp.Application.Dtos.MovieDtos
{
    public class MovieReturnDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int ViewCount { get; set; }
        public bool IsFree { get; set; }
        public DateTime ReleasedDate { get; set; }
        public TimeSpan Duration { get; set; }
        public double IMDBRate { get; set; }
        public string MovieURL { get; set; }
        public string MovieTrailerURL { get; set; }
        public string ThumbImgURL { get; set; }
        public string ThumbBgImgURL { get; set; }
        public string Summary { get; set; }
        public List<ActorDto> Actors { get; set; } = new();
        public List<CountryDto> Countries { get; set; } = new();
        public List<GenreDto> Genres { get; set; } = new();
        public List<TagDto> Tags { get; set; } = new();
        public List<CommentDto> Comments { get; set; } = new();
        public int OriginalLanguageId { get; set; }
        public string OriginalLanguageName { get; set; }
    }

}
