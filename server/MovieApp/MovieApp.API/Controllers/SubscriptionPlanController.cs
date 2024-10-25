using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.SubscriptionPlanDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionPlanController : ControllerBase
    {
        private readonly ISubscriptionPlanService _subscriptionPlanService;

        public SubscriptionPlanController(ISubscriptionPlanService subscriptionPlanService)
        {
            _subscriptionPlanService = subscriptionPlanService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _subscriptionPlanService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var subscriptionPlan = await _subscriptionPlanService.GetById(id);
            if (subscriptionPlan == null)
            {
                return NotFound();
            }
            return Ok(subscriptionPlan);
        }

        [HttpPost]
        public async Task<IActionResult> Create(SubscriptionPlanCreateDto subscriptionPlanDto)
        {
            var result = await _subscriptionPlanService.Create(subscriptionPlanDto);
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Failed to create subscription plan");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, SubscriptionPlanUpdateDto subscriptionPlanDto)
        {
            return Ok(await _subscriptionPlanService.Update(id, subscriptionPlanDto));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _subscriptionPlanService.Delete(id);
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Failed to delete subscription plan");
        }
    }
}
