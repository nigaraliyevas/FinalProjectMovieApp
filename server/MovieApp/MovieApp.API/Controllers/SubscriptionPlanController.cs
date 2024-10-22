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
            var existingSubscriptionPlan = _subscriptionPlanService.GetById(id);
            if (existingSubscriptionPlan == null)
            {
                return NotFound();
            }

            var result = await _subscriptionPlanService.Update(subscriptionPlanDto, id);
            if (result > 0)
            {
                return Ok();
            }
            return BadRequest("Failed to update subscription plan");
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
