using MovieApp.Application.Dtos.GenreDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IGenreService
    {
        Task<int> Create(GenreCreateDto genreCreateDto);
        Task<int> Update(GenreUpdateDto genreUpdateDto, int id);
        Task<int> Delete(int id);
        Task<List<Genre>> GetAll();
        //Task<List<Genre>> GetAllByMovieId(int id);
        Task<Genre> GetById(int id);
    }
}
