namespace MovieApp.Application.Dtos.WatchedMovie
{
    public class WatchedMovieDto
    {
        public int MovieId { get; set; }
        public string UserId { get; set; }
        public DateTime WatchedOn { get; set; }
        public int SubscriptionPlanId { get; set; }

    }
}
