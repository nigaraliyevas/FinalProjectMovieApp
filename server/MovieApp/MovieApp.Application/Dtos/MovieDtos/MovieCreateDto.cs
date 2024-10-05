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

        //public int MovieSliderId { get; set; } // Assuming MovieSlider is an entity with an ID
        //public List<int> ActorIds { get; set; } // Assuming MovieActor is associated via actor IDs
        //public List<int> TagIds { get; set; } // Assuming MovieTag is associated via tag IDs
        //public List<int> GenreIds { get; set; } // Assuming MovieGenre is associated via genre IDs
        //public List<int> LanguageIds { get; set; } // Assuming OriginalLanguage is associated via language IDs
        //public List<int> CommentsIds { get; set; } // Assuming OriginalLanguage is associated via language IDs
        //public List<int> CountryIds { get; set; } // Assuming MovieCountry is associated via country IDs
    }
}

