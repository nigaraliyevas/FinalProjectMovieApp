using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class Country : BaseEntity
    {
        public string Name { get; set; }
        public List<MovieCountry> MovieCountries { get; set; }
    }
}
