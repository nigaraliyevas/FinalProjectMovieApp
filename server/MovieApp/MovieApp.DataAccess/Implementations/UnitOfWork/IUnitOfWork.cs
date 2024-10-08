using MovieApp.Core.Repositories;

namespace MovieApp.DataAccess.Implementations.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IMovieRepository movieRepository { get; }
        public ICommentRepository commentRepository { get; }
        public IActorRepository actorRepository { get; }
        public IGenreRepository genreRepository { get; }
        public ICountryRepository countryRepository { get; }
        public ITagRepository tagRepository { get; }
        public IOriginalLanguageRepository originalLanguageRepository { get; }
        void Commit();
    }
}
