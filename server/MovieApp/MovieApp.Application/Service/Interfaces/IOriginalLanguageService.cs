using MovieApp.Application.Dtos.OriginalLanguageDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IOriginalLanguageService
    {
        Task<int> Create(OriginalLanguageCreateDto originalLanguageCreateDto);
        Task<int> Update(OriginalLanguageUpdateDto originalLanguageUpdateDto, int id);
        Task<int> Delete(int id);
        Task<List<OriginalLanguage>> GetAll();
        //Task<List<Genre>> GetAllByMovieId(int id);
        Task<OriginalLanguage> GetById(int id);
    }
}
