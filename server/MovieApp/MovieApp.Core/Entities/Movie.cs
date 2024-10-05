using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class Movie : BaseEntity
    {
        public string Name { get; set; }
        public int ViewCount { get; set; }
        public DateTime Duration { get; set; }
        public string Summary { get; set; }
        public DateTime ReleasedDate { get; set; }
        public byte IMDBRate { get; set; }
        public string MovieURL { get; set; }
        public string MovieTrailerURL { get; set; }
        public MovieSlider MovieSlider { get; set; }
        public List<MovieActor> MovieActors { get; set; }
        public List<MovieTag> MovieTags { get; set; }
        public List<MovieGenre> MovieGenres { get; set; }
        public List<OriginalLanguage> OriginalLanguages { get; set; }//one to many
        public List<Comment> Comments { get; set; } //one to many

        public List<MovieCountry> MovieCountries { get; set; }


    }
}
