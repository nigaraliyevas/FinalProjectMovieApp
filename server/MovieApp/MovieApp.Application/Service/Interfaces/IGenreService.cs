using MovieApp.Application.Dtos.GenreDtos;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IGenreService
    {
        Task<int> Create(GenreCreateDto genreCreateDto);
        Task<int> Update(GenreUpdateDto genreUpdateDto, int id);
        Task<int> Delete(int id);
        Task<List<GenreReturnDto>> GetAll();
        Task<GenreReturnDto> GetById(int id);
    }
}
