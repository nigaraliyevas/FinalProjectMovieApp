using FluentValidation;
using Microsoft.AspNetCore.Http;
using MovieApp.Application.Dtos.OriginalLanguageDtos;

namespace MovieApp.Application.Dtos.MovieDtos
{
    public class MovieUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public TimeSpan Duration { get; set; }
        public string Summary { get; set; }
        public DateTime ReleasedDate { get; set; }
        public byte IMDBRate { get; set; }

        public IFormFile? MovieURLUpload { get; set; }
        public IFormFile? MovieTrailerURLUpload { get; set; }

        public string? ThumbImgUpload { get; set; }
        public string? ThumbBgImgUpload { get; set; }

        public bool IsFree { get; set; }

        public OriginalLanguageDto OriginalLanguage { get; set; }
        public List<int> ActorIds { get; set; }
        public List<int> TagIds { get; set; }
        public List<int> GenreIds { get; set; }
        public List<int> CountryIds { get; set; }
        //public List<int> CommentsIds { get; set; } 
    }
    public class MovieUpdateDtoValidator : AbstractValidator<MovieUpdateDto>
    {
        public MovieUpdateDtoValidator()
        {
            RuleFor(m => m).Custom((s, c) =>
            {
                if (s.IMDBRate <= 0)
                    c.AddFailure(nameof(s.IMDBRate), "IMDBRate can't be negative or zero");
                if (s.IMDBRate < 0 || s.IMDBRate > 10)
                    c.AddFailure(nameof(s.IMDBRate), "IMDBRate has to be between 1-10");
            });
            RuleFor(m => m.MovieURLUpload)
                .NotNull().WithMessage("Movie file is required");

            RuleFor(m => m.MovieTrailerURLUpload)
                .NotNull().WithMessage("Trailer file is required");

            RuleFor(m => m.ThumbImgUpload)
                .NotNull().WithMessage("Thumb Image is Required");

            RuleFor(m => m.ThumbBgImgUpload)
                .NotNull().WithMessage("Thumb Background Image is Required");

            RuleFor(m => m.ReleasedDate)
                .LessThanOrEqualTo(DateTime.Now).WithMessage("Released date can't be in the future");
            //RuleFor(m => m.OriginalLanguage)
            //    .Null();
            //RuleFor(m => m.OriginalLanguage.Id)
            //    .Null();
        }
    }
}
