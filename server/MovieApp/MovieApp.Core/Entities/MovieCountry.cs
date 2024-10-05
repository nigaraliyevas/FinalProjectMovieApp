using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class MovieCountry : BaseEntity
    {
        public int CountryId { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public Country Country { get; set; }
    }
}
