﻿using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class TagRepository : Repository<Tag>, ITagRepository
    {
        public TagRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
