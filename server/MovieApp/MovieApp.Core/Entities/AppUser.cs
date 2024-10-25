
using Microsoft.AspNetCore.Identity;

namespace MovieApp.Core.Entities
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
        public string? UserImg { get; set; }
        public List<Comment> Comments { get; set; }
        public int WatchedMoviesCount { get; set; } = 0;
        public int? SubscriptionPlanId { get; set; }
        public SubscriptionPlan SubscriptionPlan { get; set; }
    }
}
