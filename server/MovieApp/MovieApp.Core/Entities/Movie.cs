using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class Movie : BaseEntity
    {
        public string Name { get; set; }
        public int ViewCount { get; set; }
        public TimeSpan Duration { get; set; }
        public string Summary { get; set; }
        public DateTime ReleasedDate { get; set; }
        public byte IMDBRate { get; set; }
        public string MovieURL { get; set; }
        public string MovieTrailerURL { get; set; }
        //new  added 
        public string ThumbImg { get; set; }
        public string ThumbBgImg { get; set; }
        public bool IsFree { get; set; } = false;
        public int OriginalLanguageId { get; set; }//one to many
        public virtual OriginalLanguage OriginalLanguage { get; set; }

        //
        public MovieSlider MovieSlider { get; set; }//one to one

        public List<MovieActor> MovieActors { get; set; }

        public List<MovieTag> MovieTags { get; set; }

        public List<MovieGenre> MovieGenres { get; set; }

        public List<Comment> Comments { get; set; } //one to many

        public List<MovieCountry> MovieCountries { get; set; }
        public List<WatchedMovie> WatchedByUsers { get; set; } = new List<WatchedMovie>();



    }
}
