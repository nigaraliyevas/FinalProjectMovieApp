using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class MovieCountryRepository : Repository<MovieCountry>, IMovieCountryRepository
    {
        public MovieCountryRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
