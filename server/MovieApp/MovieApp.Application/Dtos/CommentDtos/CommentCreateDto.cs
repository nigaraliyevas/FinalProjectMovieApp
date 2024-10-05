namespace MovieApp.Application.Dtos.CommentDtos
{
    public class CommentCreateDto
    {
        public string Text { get; set; }
        public string AppUserId { get; set; }  // The user who created the comment
        public int? MovieId { get; set; }  // The movie being commented on
        public int? ParentCommentId { get; set; }  // For replies to other comments
    }
}
