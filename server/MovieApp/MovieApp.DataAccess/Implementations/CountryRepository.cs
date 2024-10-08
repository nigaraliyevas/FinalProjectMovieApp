using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;

namespace MovieApp.DataAccess.Implementations
{
    public class CountryRepository : Repository<Country>, ICountryRepository
    {
        public CountryRepository(MovieAppDbContext context) : base(context)
        {
        }
    }
}
