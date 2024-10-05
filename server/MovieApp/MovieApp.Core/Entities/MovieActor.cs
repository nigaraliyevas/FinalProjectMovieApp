using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class MovieActor : BaseEntity
    {
        public int ActorId { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public Actor Actor { get; set; }
    }
}
