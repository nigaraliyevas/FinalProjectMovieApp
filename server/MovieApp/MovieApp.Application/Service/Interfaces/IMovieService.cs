using MovieApp.Application.Dtos.MovieDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IMovieService
    {
        Task<int> Create(MovieCreateDto movieCreateDto);
        Task<int> Update(MovieUpdateDto movieUpdateDto);
        Task<int> Delete(int id);
        Task<List<Movie>> GetAll();
        Task<List<Movie>> GetAllByName(string name);
        Task<List<Movie>> GetAllByGenre(string name);
        Task<Movie> GetById(int id);
    }
}
