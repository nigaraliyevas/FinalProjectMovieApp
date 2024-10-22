using MovieApp.Application.Dtos.PlanRoleNameDtos;
using MovieApp.Core.Entities;

namespace MovieApp.Application.Service.Interfaces
{
    public interface IPlanRoleNameService
    {
        Task<int> Create(PlanRoleNameCreateDto planRoleNameCreateDto);
        Task<int> Update(PlanRoleNameUpdateDto planRoleNameUpdateDto, int id);
        Task<int> Delete(int id);
        Task<IEnumerable<PlanRoleName>> GetAll();
        Task<PlanRoleName> GetById(int id);

    }
}
