namespace MovieApp.Application.Dtos.SubscriptionPlanDtos
{
    public class SubscriptionPlanCreateDto
    {
        public decimal Price { get; set; }
        public int? MaxMovies { get; set; }
    }
}
