using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class MovieTagRepository : Repository<MovieTag>, IMovieTagRepository
    {
        public MovieTagRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
