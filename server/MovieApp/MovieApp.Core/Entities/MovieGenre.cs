﻿using MovieApp.Core.Entities.Common;

namespace MovieApp.Core.Entities
{
    public class MovieGenre : BaseEntity
    {
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public int GenreId { get; set; }
        public Genre Genre { get; set; }
    }
}
