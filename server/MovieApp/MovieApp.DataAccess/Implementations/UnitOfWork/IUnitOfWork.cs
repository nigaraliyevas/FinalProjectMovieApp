using MovieApp.Core.Repositories;

namespace MovieApp.DataAccess.Implementations.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IMovieRepository movieRepository { get; }
        public ICommentRepository commentRepository { get; }
        void Commit();
    }
}
