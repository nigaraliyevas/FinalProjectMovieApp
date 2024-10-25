using MovieApp.Core.Repositories;

namespace MovieApp.DataAccess.Implementations.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IMovieRepository MovieRepository { get; }
        public ICommentRepository CommentRepository { get; }
        public IActorRepository ActorRepository { get; }
        public IGenreRepository GenreRepository { get; }
        public ICountryRepository CountryRepository { get; }
        public ITagRepository TagRepository { get; }
        public IOriginalLanguageRepository OriginalLanguageRepository { get; }
        public IMovieActorRepository MovieActorRepository { get; }
        public IMovieTagRepository MovieTagRepository { get; }
        public IMovieCountryRepository MovieCountryRepository { get; }
        public IMovieGenreRepository MovieGenreRepository { get; }
        public ISubscriptionPlanRepository SubscriptionPlanRepository { get; }
        public IPlanRoleNameRepository PlanRoleNameRepository { get; }
        public IMovieSliderRepository MovieSliderRepository { get; }


        public void Commit();
    }
}
