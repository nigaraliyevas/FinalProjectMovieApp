using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class MovieSliderRepository : Repository<MovieSlider>, IMovieSliderRepository
    {
        public MovieSliderRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
