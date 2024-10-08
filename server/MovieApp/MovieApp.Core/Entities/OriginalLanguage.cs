using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class OriginalLanguage : BaseEntity
    {
        public string Name { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }

    }
}
