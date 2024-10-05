using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class Comment : BaseEntity
    {
        public string CommentText { get; set; }
        public DateTime CreatedAt { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public int? MovieId { get; set; }
        public Movie Movie { get; set; }
        public int? ParentCommentId { get; set; }

        public Comment ParentComment { get; set; }
        public List<Comment> Replies { get; set; }  // Collection of replies


    }
}
