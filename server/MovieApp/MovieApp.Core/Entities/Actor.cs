using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class Actor : BaseEntity
    {
        public string FullName { get; set; }
        public List<MovieActor> MovieActors { get; set; }
    }
}
