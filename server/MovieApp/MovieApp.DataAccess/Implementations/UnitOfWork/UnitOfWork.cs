using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly MovieAppDbContext _context;
        public IMovieRepository movieRepository { get; private set; }

        public ICommentRepository commentRepository { get; private set; }

        public UnitOfWork(MovieAppDbContext context)
        {
            _context = context;
            movieRepository = new MovieRepository(_context);
            commentRepository = new CommentRepository(_context);
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
