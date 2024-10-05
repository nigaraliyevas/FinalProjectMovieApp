using MovieApp.Application.Dtos.CommentDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface ICommentService
    {
        Task<int> Create(CommentCreateDto commentCreateDto);
        Task<int> AddReplyToComment(int parentCommentId, CommentCreateDto commentCreateDto); // Add this method
        Task<int> Update(CommentUpdateDto commentUpdateDto);
        Task<int> Delete(int id);
        Task<List<Movie>> GetAll();
        Task<Comment> GetById(int id);
    }
}
