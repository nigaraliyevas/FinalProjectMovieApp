using MovieApp.Application.Dtos.MovieDtos;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IMovieService
    {
        Task<int> Create(MovieCreateDto movieCreateDto);
        Task<int> Update(int id, MovieUpdateDto movieUpdateDto);
        Task<int> Delete(int id);
        MovieListDto GetAllByName(string name, int pageSize, int page);
        MovieListDto GetAll(string? search, int pageSize, int page);
        MovieListDto GetAllByGenre(string name, int pageSize, int page);
        MovieListDto GetAllByYear(int year, int pageSize, int page);
        MovieListDto GetAllFree(int pageSize, int page);
        MovieListDto Filter(int? year, string? genre, string? language, int page, int pageSize);
        Task<MovieReturnDto> GetById(int id);
    }
}
