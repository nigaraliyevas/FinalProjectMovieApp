using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class WatchedMovie : BaseEntity
    {
        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        public string UserId { get; set; }
        public AppUser User { get; set; }

        public DateTime WatchedOn { get; set; } = DateTime.Now;
    }
}
