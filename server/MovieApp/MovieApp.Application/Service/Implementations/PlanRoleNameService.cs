using AutoMapper;
using Microsoft.AspNetCore.Identity;
using MovieApp.Application.Dtos.PlanRoleNameDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class PlanRoleNameService : IPlanRoleNameService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public PlanRoleNameService(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }
        public async Task<int> Create(PlanRoleNameCreateDto planRoleNameCreateDto)
        {
            var planRoleNames = await _unitOfWork.PlanRoleNameRepository.GetAll();
            if (planRoleNames.Count() > 3) throw new CustomException(400, "The max limit");
            if (planRoleNameCreateDto == null) throw new CustomException(404, "Null Exception");

            var newPlan = _mapper.Map<PlanRoleName>(planRoleNameCreateDto);
            if (newPlan == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.PlanRoleNameRepository.Create(newPlan);
            _unitOfWork.Commit();
            return newPlan.Id;
        }

        public async Task<int> Delete(int id)
        {
            var plan = await _unitOfWork.PlanRoleNameRepository.GetEntity(x => x.Id == id);
            if (plan == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.PlanRoleNameRepository.Delete(plan);
            _unitOfWork.Commit();
            return plan.Id;
        }

        public async Task<IEnumerable<PlanRoleName>> GetAll()
        {
            var plans = await _unitOfWork.PlanRoleNameRepository.GetAll();
            if (plans == null) throw new CustomException(404, "Not Found");
            return plans;
        }

        public async Task<PlanRoleName> GetById(int id)
        {
            var plan = await _unitOfWork.PlanRoleNameRepository.GetEntity(x => x.Id == id);
            if (plan is null) throw new CustomException(404, "Not found");
            return plan;
        }

        public async Task<int> Update(PlanRoleNameUpdateDto planRoleNameUpdateDto, int id)
        {
            var planRole = await _unitOfWork.PlanRoleNameRepository.GetEntity(x => x.Id == id);
            if (planRole == null)
            {
                throw new CustomException("404", "Plan role not found");
            }

            _mapper.Map(planRoleNameUpdateDto, planRole);

            await _unitOfWork.PlanRoleNameRepository.Update(planRole);
            _unitOfWork.Commit();

            return planRole.Id;
        }
    }
}
