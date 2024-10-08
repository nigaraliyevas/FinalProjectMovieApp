using MovieApp.Application.Dtos.TagDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface ITagService
    {
        Task<int> Create(TagCreateDto tagCreateDto);
        Task<int> Update(TagUpdateDto tagUpdateDto, int id);
        Task<int> Delete(int id);
        Task<List<Tag>> GetAll();
        //Task<List<Genre>> GetAllByMovieId(int id);
        Task<Tag> GetById(int id);
    }
}
