using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class MovieTag : BaseEntity
    {
        public int MovieId { get; set; }
        public int TagId { get; set; }
        public Movie Movie { get; set; }
        public Tag Tag { get; set; }

    }
}
