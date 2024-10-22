//using Microsoft.AspNetCore.Identity;
//using Microsoft.Extensions.Configuration;
//using MovieApp.Application.Service.Interfaces;
//using MovieApp.Core.Entities;
//using Stripe;

//namespace MovieApp.Application.Service.Implementations
//{
//    public class StripePaymentService : IPaymentService
//    {
//        private readonly UserManager<AppUser> _userManager;
//        private readonly IConfiguration _configuration;

//        public StripePaymentService(UserManager<AppUser> userManager, IConfiguration configuration)
//        {
//            _userManager = userManager;
//            _configuration = configuration;
//            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
//        }

//        public async Task<string> CreateSubscription(string userId, string priceId)
//        {
//            var user = await _userManager.FindByIdAsync(userId);
//            //if (user == null) throw new CustomException(404, "User Not found");

//            //var options = new SubscriptionCreateOptions
//            //{
//            //    Customer = user.StripeCustomerId, // Assume user has a Stripe customer ID
//            //    Items = new List<SubscriptionItemOptions>
//            //    {
//            //        new SubscriptionItemOptions { Price = priceId }
//            //    }
//            //};

//            //var service = new SubscriptionService();
//            //var subscription = await service.CreateAsync(options);

//            //user.SubscriptionPlanId = subscription.Id;
//            //await _userManager.UpdateAsync(user);

//            //return subscription.Id;
//            return "s";
//        }

//        public async Task AssignDefaultSubscription(string userId)
//        {
//            var user = await _userManager.FindByIdAsync(userId);
//            //if (user == null) throw new CustomException(404, "User not found");

//            //user.SubscriptionPlanId = "free_plan_id"; // Adjust this based on your plan setup
//            //await _userManager.UpdateAsync(user);
//        }
//    }
//}
