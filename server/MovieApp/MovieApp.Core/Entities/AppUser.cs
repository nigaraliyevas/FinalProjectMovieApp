
using Microsoft.AspNetCore.Identity;

namespace MovieApp.Core.Entities
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
        public string? UserImg { get; set; }
        public List<Comment> Comments { get; set; }
        public int WatchedMoviesCount { get; set; }
        public List<WatchedMovie> WatchedMovies { get; set; } = new List<WatchedMovie>();
        //public string StripeCustomerId { get; set; } // To store the Stripe customer ID
        public SubscriptionPlan SubscriptionPlan { get; set; }
        public int SubscriptionPlanId { get; set; } // To store the user's subscription plan ID
    }
}
