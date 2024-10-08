using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class ActorRepository : Repository<Actor>, IActorRepository
    {
        public ActorRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
