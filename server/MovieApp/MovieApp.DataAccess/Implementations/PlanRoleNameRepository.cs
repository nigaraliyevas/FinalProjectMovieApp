using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class PlanRoleNameRepository : Repository<PlanRoleName>, IPlanRoleNameRepository
    {
        public PlanRoleNameRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
