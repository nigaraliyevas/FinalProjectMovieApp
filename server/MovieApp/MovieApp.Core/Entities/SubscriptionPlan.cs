using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class SubscriptionPlan : BaseEntity
    {
        public decimal Price { get; set; } // 0 for Free
        public int? MaxMovies { get; set; } // 5 for Free
        public List<AppUser> AppUsers { get; set; }
        public List<PlanRoleName> PlanRoleNames { get; set; }
    }
}
