namespace MovieApp.Application.Dtos.MovieDtos
{
    public class MovieListDto
    {
        public int Page { get; set; }
        public int TotalCount { get; set; }
        public List<MovieReturnDto> Items { get; set; }
    }
}
