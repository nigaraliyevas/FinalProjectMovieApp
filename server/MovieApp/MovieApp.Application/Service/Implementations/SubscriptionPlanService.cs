using AutoMapper;
using MovieApp.Application.Dtos.SubscriptionPlanDtos;
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

        public SubscriptionPlanService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
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

        public async Task<int> Update(int id, SubscriptionPlanUpdateDto subscriptionPlanDto)
        {
            if (subscriptionPlanDto == null) throw new CustomException(400, "Invalid subscription plan data.");

            var existPlan = await _unitOfWork.SubscriptionPlanRepository.GetEntity(x => x.Id == id);
            if (existPlan == null) throw new CustomException(404, "Not found");
            existPlan.UpdatedDate = DateTime.Now;
            existPlan.Price = subscriptionPlanDto.Price;
            existPlan.MaxMovies = subscriptionPlanDto.MaxMovies;
            await _unitOfWork.SubscriptionPlanRepository.Update(existPlan);
            _unitOfWork.Commit();

            return existPlan.Id;
        }

        public async Task<int> Delete(int id)
        {
            var subscriptionPlan = await _unitOfWork.SubscriptionPlanRepository.GetEntity(x => x.Id == id);
            if (subscriptionPlan == null) throw new CustomException(404, "Not found");

            await _unitOfWork.SubscriptionPlanRepository.Delete(subscriptionPlan);
            _unitOfWork.Commit();

            return subscriptionPlan.Id;
        }

    }
}
