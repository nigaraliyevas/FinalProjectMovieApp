using MovieApp.Application.Dtos.CommentDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface ICommentService
    {
        Task<CommentDto> Create(CommentCreateDto commentCreateDto);
        //Task<int> AddReplyToComment(int parentCommentId, CommentCreateDto commentCreateDto); // do this later if u have time :|
        Task<int> Update(CommentUpdateDto commentUpdateDto, int id);
        Task<int> Delete(int id);
        Task<List<Comment>> GetAll();
        Task<Comment> GetById(int id);
    }
}
