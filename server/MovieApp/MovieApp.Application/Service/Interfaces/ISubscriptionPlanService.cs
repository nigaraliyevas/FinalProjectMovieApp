using MovieApp.Application.Dtos.SubscriptionPlanDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface ISubscriptionPlanService
    {
        Task<SubscriptionPlan> GetById(int id);
        Task<IEnumerable<SubscriptionPlan>> GetAll();
        Task<int> Create(SubscriptionPlanCreateDto subscriptionPlan);
        Task<int> Update(int id, SubscriptionPlanUpdateDto subscriptionPlan);
        Task<int> Delete(int id);

    }
}
