using MovieApp.Application.Dtos.MovieSliderDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IMovieSliderService
    {
        Task<int> Create(MovieSliderCreateDto movieSliderCreateDto);
        Task<int> Update(MovieSliderUpdateDto movieSliderUpdateDto, int id);
        Task<int> Delete(int id);
        Task<MovieSlider> GetById(int id);
        Task<List<MovieSliderReturnDto>> GetAll();
    }
}
