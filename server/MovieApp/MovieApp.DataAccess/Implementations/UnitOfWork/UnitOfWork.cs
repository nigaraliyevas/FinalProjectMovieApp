using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly MovieAppDbContext _context;
        public IMovieRepository movieRepository { get; private set; }

        public ICommentRepository commentRepository { get; private set; }

        public IActorRepository actorRepository { get; private set; }
        public IGenreRepository genreRepository { get; private set; }
        public ICountryRepository countryRepository { get; private set; }
        public ITagRepository tagRepository { get; private set; }
        public IOriginalLanguageRepository originalLanguageRepository { get; private set; }

        public UnitOfWork(MovieAppDbContext context)
        {
            _context = context;
            movieRepository = new MovieRepository(_context);
            commentRepository = new CommentRepository(_context);
            actorRepository = new ActorRepository(_context);
            genreRepository = new GenreRepository(_context);
            countryRepository = new CountryRepository(_context);
            tagRepository = new TagRepository(_context);
            originalLanguageRepository = new OriginalLanguageRepository(_context);
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
