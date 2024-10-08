using Microsoft.AspNetCore.Http;

namespace MovieApp.Application.Dtos.MovieDtos
{
    public class MovieUpdateDto
    {


        public IFormFile ThumbImgUpload { get; set; }
        public IFormFile ThumbBgImgUpload { get; set; }
        public bool IsFree { get; set; }
    }
}
