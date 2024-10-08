using FluentValidation;
using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace MovieApp.Application.Dtos.MovieDtos
{
    public class MovieCreateDto
    {
        public string Name { get; set; }
        public DateTime Duration { get; set; }
        public string Summary { get; set; }
        public DateTime ReleasedDate { get; set; }
        public byte IMDBRate { get; set; }
        public IFormFile MovieURLUpload { get; set; }
        public IFormFile MovieTrailerURLUpload { get; set; }
        [JsonIgnore]
        public string MovieURL { get; set; }
        [JsonIgnore]
        public string MovieTrailerURL { get; set; }


        public IFormFile ThumbImgUpload { get; set; }
        public IFormFile ThumbBgImgUpload { get; set; }
        [JsonIgnore]
        public string ThumbImg { get; set; }
        [JsonIgnore]
        public string ThumbBgImg { get; set; }

        public bool IsFree { get; set; }

        public List<int> ActorIds { get; set; } // Assuming MovieActor is associated via actor IDs
        public List<int> TagIds { get; set; } // Assuming MovieTag is associated via tag IDs
        public List<int> GenreIds { get; set; } // Assuming MovieGenre is associated via genre IDs
        public List<int> CountryIds { get; set; } // Assuming MovieCountry is associated via country IDs
        //public List<int> CommentsIds { get; set; } // Assuming OriginalLanguage is associated via language IDs
    }
    public class MovieCreateDtoValidator : AbstractValidator<MovieCreateDto>
    {
        public MovieCreateDtoValidator()
        {
            RuleFor(m => m).Custom((s, c) =>
            {
                if (s.IMDBRate <= 0)
                    c.AddFailure(nameof(s.IMDBRate), "IMDBRate can't be negative or zero");
                if (s.IMDBRate < 0 || s.IMDBRate > 10)
                    c.AddFailure(nameof(s.IMDBRate), "IMDBRate has to be between 1-10");
            });
        }
    }
}

