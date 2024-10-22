using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class MovieActorRepository : Repository<MovieActor>, IMovieActorRepository
    {
        public MovieActorRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
