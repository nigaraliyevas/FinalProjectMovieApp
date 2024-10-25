using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.CountryDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _countryService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _countryService.GetById(id));
        }
        [HttpPost]
        public async Task<IActionResult> Create(CountryCreateDto countryCreateDto)
        {
            return Ok(await _countryService.Create(countryCreateDto));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(CountryUpdateDto countryUpdateDto, int id)
        {
            return Ok(await _countryService.Update(countryUpdateDto, id));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _countryService.Delete(id));
        }
    }
}
