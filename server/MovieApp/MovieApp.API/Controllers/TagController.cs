using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.TagDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _tagService.GetAll());
        }

        [HttpGet("id/")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _tagService.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Create(TagCreateDto tagCreateDto)
        {
            return Ok(await _tagService.Create(tagCreateDto));
        }

        [HttpPut]
        public async Task<IActionResult> Update(TagUpdateDto tagUpdateDto, int id)
        {
            return Ok(await _tagService.Update(tagUpdateDto, id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _tagService.Delete(id));
        }
    }
}
