using Microsoft.AspNetCore.Identity;
using MovieApp.Application.Dtos.PaymentDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;
using Stripe;
using Stripe.Checkout;

namespace MovieApp.Application.Services
{
    public class StripePaymentService : IPaymentService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;

        public StripePaymentService(UserManager<AppUser> userManager, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
        }

        public async Task<string> CreateCheckoutSessionAsync(PaymentCreateDto paymentCreate)
        {
            if (paymentCreate == null) throw new CustomException(404, "Bu nedii");
            StripeConfiguration.ApiKey = "sk_test_51QBfMMGBs85KmKqHBWcPh5N4rsNjRmdNNPJGcDYp5ZVwIe0XUyHyXVbhLzwhul8qKtwZBMoGw8DXgu27ntyUgc7200M6gkWfhm";

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        UnitAmount = 4999, // e.g., $49.99 for premium plan
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "premium",
                        },
                    },
                    Quantity = 1,
                },
            },
                Mode = "payment",
                CustomerEmail = paymentCreate.Email,
                SuccessUrl = "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = "http://localhost:5173/cancel",
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            return session.Id;
        }

        public async Task HandlePaymentSuccessAsync(string sessionId)
        {
            var service = new SessionService();
            var session = await service.GetAsync(sessionId);

            var userEmail = session.CustomerDetails.Email;
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user != null)
            {
                var premiumPlan = await _unitOfWork.SubscriptionPlanRepository
                    .GetEntity(x => x.PlanRoleNames.Any(rn => rn.Name.ToLower() == "premium"));

                if (premiumPlan != null)
                {
                    user.SubscriptionPlanId = premiumPlan.Id;
                    await _userManager.UpdateAsync(user);
                }
            }
        }

    }
}
