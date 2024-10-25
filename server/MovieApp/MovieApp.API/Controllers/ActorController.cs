using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.ActorDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActorController : ControllerBase
    {
        private readonly IActorService _actorService;

        public ActorController(IActorService actorService)
        {
            _actorService = actorService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _actorService.GetAll());
        }

        [HttpGet("movieId")]
        public async Task<IActionResult> GetAllByMovieId(int id)
        {
            return Ok(await _actorService.GetAllByMovieId(id));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _actorService.GetById(id));
        }

        [HttpPost]

        public async Task<IActionResult> Create(ActorCreateDto actorCreateDto)
        {
            return Ok(await _actorService.Create(actorCreateDto));
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> Update(ActorUpdateDto actorUpdateDto, int id)
        {
            return Ok(await _actorService.Update(actorUpdateDto, id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _actorService.Delete(id));
        }
    }
}
