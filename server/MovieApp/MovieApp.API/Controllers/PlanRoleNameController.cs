using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.PlanRoleNameDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanRoleNameController : ControllerBase
    {
        private readonly IPlanRoleNameService _planRoleNameService;

        public PlanRoleNameController(IPlanRoleNameService planRoleNameService)
        {
            _planRoleNameService = planRoleNameService;
        }
        [HttpPost]
        public async Task<IActionResult> Create(PlanRoleNameCreateDto planRoleNameCreateDto)
        {
            return Ok(await _planRoleNameService.Create(planRoleNameCreateDto));
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _planRoleNameService.Delete(id));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(PlanRoleNameUpdateDto planRoleNameUpdateDto, int id)
        {
            return Ok(await _planRoleNameService.Update(planRoleNameUpdateDto, id));
        }
        [HttpGet("id")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _planRoleNameService.GetById(id));
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _planRoleNameService.GetAll());
        }
    }
}
