using MovieApp.Application.Dtos.SubscriptionPlanDtos;
using MovieApp.Application.Dtos.WatchedMovie;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface ISubscriptionPlanService
    {
        Task<SubscriptionPlan> GetById(int id);
        Task<IEnumerable<SubscriptionPlan>> GetAll();
        Task<int> Create(SubscriptionPlanCreateDto subscriptionPlan);
        Task<int> Update(SubscriptionPlanUpdateDto subscriptionPlan, int id);
        Task<int> Delete(int id);
        Task MarkMovieAsWatched(WatchedMovieDto watchedMovieDto);
        Task<int> GetWatchedMoviesCount(string userId);
    }
}
