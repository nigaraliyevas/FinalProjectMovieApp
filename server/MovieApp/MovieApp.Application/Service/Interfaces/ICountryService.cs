using MovieApp.Application.Dtos.CountryDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface ICountryService
    {
        Task<int> Create(CountryCreateDto genreCreateDto);
        Task<int> Update(CountryUpdateDto genreUpdateDto, int id);
        Task<int> Delete(int id);
        Task<List<Country>> GetAll();
        Task<Country> GetById(int id);
    }
}
