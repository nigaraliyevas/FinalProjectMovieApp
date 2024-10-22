using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Dtos.CommentDtos;
using MovieApp.Application.Service.Interfaces;

namespace MovieApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CommentCreateDto commentCreateDto)
        {
            return Ok(await _commentService.Create(commentCreateDto));
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _commentService.GetAll());
        }

        [HttpGet("id/")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _commentService.GetById(id));
        }

        [HttpPut]
        public async Task<IActionResult> Update(CommentUpdateDto commentUpdateDto, int id)
        {
            return Ok(await _commentService.Update(commentUpdateDto, id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _commentService.Delete(id));
        }
    }
}
