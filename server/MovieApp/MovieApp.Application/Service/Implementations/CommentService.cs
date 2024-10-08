using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MovieApp.Application.Dtos.CommentDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class CommentService : ICommentService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public CommentService(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        //public Task<int> AddReplyToComment(int parentCommentId, CommentCreateDto commentCreateDto)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<int> Create(CommentCreateDto commentCreateDto)
        {
            if (commentCreateDto == null) throw new CustomException(404, "Null Exception");
            var newComment = _mapper.Map<Comment>(commentCreateDto);
            await _unitOfWork.commentRepository.Create(newComment);
            _unitOfWork.Commit();
            return newComment.Id;
        }

        public Task<int> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Comment>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Comment> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(CommentUpdateDto commentUpdateDto)
        {
            throw new NotImplementedException();
        }
    }
}
