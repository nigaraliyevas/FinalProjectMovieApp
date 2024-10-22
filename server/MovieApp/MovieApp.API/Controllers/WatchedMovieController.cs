using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.WatchedMovie;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WatchedMovieController : ControllerBase
    {
        private readonly IWatchedMovieService _watchedMovieService;
        private readonly ISubscriptionPlanService _subscriptionPlanService;
        public WatchedMovieController(IWatchedMovieService watchedMovieService, ISubscriptionPlanService subscriptionPlanService)
        {
            _watchedMovieService = watchedMovieService;
            _subscriptionPlanService = subscriptionPlanService;
        }

        [HttpPost("watch")]
        public async Task<IActionResult> MarkMovieAsWatched(WatchedMovieDto watchedMovieDto)
        {
            if (watchedMovieDto == null)
            {
                return BadRequest("Invalid data.");
            }

            await _subscriptionPlanService.MarkMovieAsWatched(watchedMovieDto);
            return Ok();
        }

        [HttpGet("{userId}/count")]
        public async Task<ActionResult<int>> GetWatchedMoviesCount(string userId)
        {
            var count = await _watchedMovieService.GetWatchedMoviesCount(userId);
            return Ok(count);
        }
    }
}
