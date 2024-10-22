using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.MovieSliderDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieSliderController : ControllerBase
    {
        private IMovieSliderService _movieSliderService;

        public MovieSliderController(IMovieSliderService movieSliderService)
        {
            _movieSliderService = movieSliderService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _movieSliderService.GetAll());
        }

        [HttpGet("id/")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _movieSliderService.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(MovieSliderCreateDto movieSliderCreateDto)
        {
            return Ok(await _movieSliderService.Create(movieSliderCreateDto));
        }

        [HttpPut]
        public async Task<IActionResult> Update(MovieSliderUpdateDto movieSliderUpdateDto, int id)
        {
            return Ok(await _movieSliderService.Update(movieSliderUpdateDto, id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _movieSliderService.Delete(id));
        }
    }
}
