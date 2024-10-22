using MovieApp.Application.Dtos.WatchedMovie;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IWatchedMovieService
    {
        Task<int> GetWatchedMoviesCount(string userId);
        Task<List<WatchedMovieDto>> GetWatchedMovies(string userId);
        Task MarkMovieAsWatched(WatchedMovieDto watchedMovieDto);
    }
}
