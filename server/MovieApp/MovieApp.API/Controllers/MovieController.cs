using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.MovieDtos;
using MovieApp.Application.Service.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class MovieController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MovieController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _movieService.GetAll());
    }

    [HttpGet("name/{name}")]
    public async Task<IActionResult> GetAllByName(string name)
    {
        return Ok(await _movieService.GetAllByName(name));
    }

    [HttpGet("id/{id}")]
    public async Task<IActionResult> Get(int id)
    {
        return Ok(await _movieService.GetById(id));
    }

    [HttpGet("genre/{genre}")]
    public async Task<IActionResult> GetAllByGenre(string genre)
    {
        return Ok(await _movieService.GetAllByGenre(genre));
    }

    [HttpPost]
    public async Task<IActionResult> Create(MovieCreateDto movieCreateDto)
    {
        return Ok(await _movieService.Create(movieCreateDto));
    }

    [HttpPut]
    public async Task<IActionResult> Update(MovieUpdateDto movieUpdateDto)
    {
        return Ok(await _movieService.Update(movieUpdateDto));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await _movieService.Delete(id));
    }
}
