using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class MovieSlider : BaseEntity
    {
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
