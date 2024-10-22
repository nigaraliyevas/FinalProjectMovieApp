using AutoMapper;
using MovieApp.Application.Dtos.SubscriptionPlanDtos;
using MovieApp.Application.Dtos.WatchedMovie;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class SubscriptionPlanService : ISubscriptionPlanService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWatchedMovieService _watchedMovieService;

        public SubscriptionPlanService(IUnitOfWork unitOfWork, IMapper mapper, IWatchedMovieService watchedMovieService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _watchedMovieService = watchedMovieService;
        }

        public async Task<IEnumerable<SubscriptionPlan>> GetAll()
        {
            var subscriptionPlans = await _unitOfWork.SubscriptionPlanRepository.GetAll(null, "PlanRoleNames");
            if (subscriptionPlans == null || !subscriptionPlans.Any())
                throw new CustomException(404, "Not found");
            return subscriptionPlans;
        }

        public async Task<SubscriptionPlan> GetById(int id)
        {
            if (id <= 0) throw new CustomException(404, "Null Exception");
            var subscriptionPlan = await _unitOfWork.SubscriptionPlanRepository.GetEntity(x => x.Id == id, "PlanRoleNames");
            if (subscriptionPlan == null) throw new CustomException(404, "Not Found");
            return subscriptionPlan;
        }

        public async Task<int> Create(SubscriptionPlanCreateDto subscriptionPlanDto)
        {
            if (subscriptionPlanDto == null) throw new CustomException(400, "Invalid subscription plan data.");

            var subscriptionPlans = await _unitOfWork.SubscriptionPlanRepository.GetAll();
            if (subscriptionPlans.Count() > 3) throw new CustomException(400, "The limit is reached");

            var subscriptionPlan = _mapper.Map<SubscriptionPlan>(subscriptionPlanDto);
            await _unitOfWork.SubscriptionPlanRepository.Create(subscriptionPlan);
            _unitOfWork.Commit();

            return subscriptionPlan.Id;
        }

        public async Task<int> Update(SubscriptionPlanUpdateDto subscriptionPlanDto, int id)
        {
            if (subscriptionPlanDto == null) throw new CustomException(400, "Invalid subscription plan data.");

            var existPlan = await _unitOfWork.SubscriptionPlanRepository.GetEntity(x => x.Id == id);
            if (existPlan == null) throw new CustomException(404, "Not found");

            var subscriptionPlan = _mapper.Map<SubscriptionPlan>(subscriptionPlanDto);
            await _unitOfWork.SubscriptionPlanRepository.Update(subscriptionPlan);
            _unitOfWork.Commit();

            return subscriptionPlan.Id;
        }

        public async Task<int> Delete(int id)
        {
            var subscriptionPlan = await _unitOfWork.SubscriptionPlanRepository.GetEntity(x => x.Id == id);
            if (subscriptionPlan == null) throw new CustomException(404, "Not found");

            await _unitOfWork.SubscriptionPlanRepository.Delete(subscriptionPlan);
            _unitOfWork.Commit();

            return subscriptionPlan.Id;
        }

        public async Task MarkMovieAsWatched(WatchedMovieDto watchedMovieDto)
        {
            if (watchedMovieDto == null) throw new CustomException(400, "Invalid watched movie data.");

            var subscriptionPlan = await GetById(watchedMovieDto.SubscriptionPlanId);

            var watchedCount = await _watchedMovieService.GetWatchedMoviesCount(watchedMovieDto.UserId);

            if (subscriptionPlan.MaxMovies != -1 && watchedCount >= subscriptionPlan.MaxMovies)
            {
                throw new CustomException(403, "You've reached max count for this plan");
            }

            await _watchedMovieService.MarkMovieAsWatched(watchedMovieDto);
        }

        public async Task<int> GetWatchedMoviesCount(string userId)
        {
            return await _watchedMovieService.GetWatchedMoviesCount(userId);
        }
    }
}
