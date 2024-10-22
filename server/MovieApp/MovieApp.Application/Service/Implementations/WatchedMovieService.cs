using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MovieApp.Application.Dtos.WatchedMovie;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class WatchedMovieService : IWatchedMovieService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public WatchedMovieService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task MarkMovieAsWatched(WatchedMovieDto watchedMovieDto)
        {
            if (watchedMovieDto == null) throw new CustomException(400, "Null Exception");

            var watchedMovie = _mapper.Map<WatchedMovie>(watchedMovieDto);

            await _unitOfWork.WatchedMovieRepository.Create(watchedMovie);
            _unitOfWork.Commit();
        }

        public async Task<int> GetWatchedMoviesCount(string userId)
        {
            return await _unitOfWork.WatchedMovieRepository.GetAllAsQeuryable(x => x.UserId == userId).CountAsync();
        }

        public async Task<List<WatchedMovieDto>> GetWatchedMovies(string userId)
        {
            var watchedMovies = await _unitOfWork.WatchedMovieRepository
                .GetAll(x => x.UserId == userId);

            return _mapper.Map<List<WatchedMovieDto>>(watchedMovies);
        }
    }
}
