
using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class OriginalLanguageRepository : Repository<OriginalLanguage>, IOriginalLanguageRepository
    {
        public OriginalLanguageRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
