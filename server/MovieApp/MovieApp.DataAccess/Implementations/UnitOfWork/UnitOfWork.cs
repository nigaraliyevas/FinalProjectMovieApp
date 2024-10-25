using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly MovieAppDbContext _context;
        public IMovieRepository MovieRepository { get; private set; }
        public ICommentRepository CommentRepository { get; private set; }

        public IActorRepository ActorRepository { get; private set; }
        public IGenreRepository GenreRepository { get; private set; }
        public ICountryRepository CountryRepository { get; private set; }
        public ITagRepository TagRepository { get; private set; }
        public IOriginalLanguageRepository OriginalLanguageRepository { get; private set; }
        public IMovieActorRepository MovieActorRepository { get; private set; }
        public IMovieTagRepository MovieTagRepository { get; private set; }
        public IMovieCountryRepository MovieCountryRepository { get; private set; }
        public IMovieGenreRepository MovieGenreRepository { get; private set; }
        public ISubscriptionPlanRepository SubscriptionPlanRepository { get; private set; }
        public IPlanRoleNameRepository PlanRoleNameRepository { get; private set; }
        public IMovieSliderRepository MovieSliderRepository { get; private set; }


        public UnitOfWork(MovieAppDbContext context, IMovieRepository movieRepository, ICommentRepository commentRepository, IActorRepository actorRepository, IGenreRepository genreRepository, ICountryRepository countryRepository, ITagRepository tagRepository, IOriginalLanguageRepository originalLanguageRepository, IMovieActorRepository movieActorRepository, IMovieTagRepository movieTagRepository, IMovieCountryRepository movieCountryRepository, IMovieGenreRepository movieGenreRepository, ISubscriptionPlanRepository subscriptionPlanRepository, IPlanRoleNameRepository planRoleNameRepository, IMovieSliderRepository movieSliderRepository)
        {
            _context = context;
            MovieRepository = movieRepository;
            CommentRepository = commentRepository;
            ActorRepository = actorRepository;
            GenreRepository = genreRepository;
            CountryRepository = countryRepository;
            TagRepository = tagRepository;
            OriginalLanguageRepository = originalLanguageRepository;
            MovieActorRepository = movieActorRepository;
            MovieTagRepository = movieTagRepository;
            MovieCountryRepository = movieCountryRepository;
            MovieGenreRepository = movieGenreRepository;
            SubscriptionPlanRepository = subscriptionPlanRepository;
            PlanRoleNameRepository = planRoleNameRepository;
            MovieSliderRepository = movieSliderRepository;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
