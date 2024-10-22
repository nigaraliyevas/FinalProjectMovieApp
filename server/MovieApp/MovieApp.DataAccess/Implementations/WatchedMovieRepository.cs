using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class WatchedMovieRepository : Repository<WatchedMovie>, IWatchedMovieRepository
    {
        public WatchedMovieRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
