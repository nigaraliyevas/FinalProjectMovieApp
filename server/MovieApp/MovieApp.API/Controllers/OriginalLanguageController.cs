using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.OriginalLanguageDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OriginalLanguageController : ControllerBase
    {
        private readonly IOriginalLanguageService _originalLanguage;

        public OriginalLanguageController(IOriginalLanguageService originalLanguage)
        {
            _originalLanguage = originalLanguage;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _originalLanguage.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _originalLanguage.GetById(id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(OriginalLanguageCreateDto originalLanguageCreateDto)
        {
            return Ok(await _originalLanguage.Create(originalLanguageCreateDto));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(OriginalLanguageUpdateDto originalLanguageUpdateDto, int id)
        {
            return Ok(await _originalLanguage.Update(originalLanguageUpdateDto, id));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _originalLanguage.Delete(id));
        }
    }
}
