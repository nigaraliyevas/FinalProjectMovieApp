using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.GenreDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreService _genreService;

        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _genreService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _genreService.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(GenreCreateDto genreCreateDto)
        {
            return Ok(await _genreService.Create(genreCreateDto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(GenreUpdateDto genreUpdateDto, int id)
        {
            return Ok(await _genreService.Update(genreUpdateDto, id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _genreService.Delete(id));
        }
    }
}
