using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }
        public List<MovieTag> MovieTags { get; set; }
    }
}
