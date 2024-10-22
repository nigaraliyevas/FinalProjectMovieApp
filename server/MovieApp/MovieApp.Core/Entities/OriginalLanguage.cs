using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class OriginalLanguage : BaseEntity
    {
        public string Name { get; set; }
        public List<Movie> Movies { get; set; }
    }
}
