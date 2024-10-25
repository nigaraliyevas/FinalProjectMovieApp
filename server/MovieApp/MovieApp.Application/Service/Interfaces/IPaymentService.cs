using MovieApp.Application.Dtos.PaymentDtos;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IPaymentService
    {
        Task<string> CreateCheckoutSessionAsync(PaymentCreateDto paymentCreateDto);
        Task HandlePaymentSuccessAsync(PaymentSuccessDto paymentSuccessDto);
    }


}
