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
    public IActionResult GetAll(string? search, int pageSize = 15, int page = 1)
    {
        return Ok(_movieService.GetAll(search, pageSize, page));
    }

    [HttpGet("name")]
    public IActionResult GetAllByName(string name, int pageSize = 15, int page = 1)
    {
        return Ok(_movieService.GetAllByName(name, pageSize, page));
    }
    //[Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        return Ok(await _movieService.GetById(id));
    }

    [HttpGet("genre")]
    public IActionResult GetAllByGenre(string name, int pageSize = 15, int page = 1)
    {
        return Ok(_movieService.GetAllByGenre(name, pageSize, page));
    }
    [HttpGet("year")]
    public IActionResult GetAllByYear(int year, int pageSize = 15, int page = 1)
    {
        return Ok(_movieService.GetAllByYear(year, pageSize, page));
    }
    [HttpGet("free")]
    public IActionResult GetAllFree(int pageSize = 15, int page = 1)
    {
        return Ok(_movieService.GetAllFree(pageSize, page));
    }

    [HttpPost]
    public async Task<IActionResult> Create(MovieCreateDto movieCreateDto)
    {
        return Ok(await _movieService.Create(movieCreateDto));
    }
    [HttpGet("filter")]
    public IActionResult Filter(int? year, string? genre, string? language, int page = 1, int pageSize = 10)
    {
        return Ok(_movieService.Filter(year, genre, language, page, pageSize));
    }

    [HttpPost("{id}")]
    public async Task<IActionResult> Update([FromForm] MovieUpdateDto movieUpdateDto)
    {
        return Ok(await _movieService.Update(movieUpdateDto));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await _movieService.Delete(id));
    }
}
