using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MovieApp.Core.Entities;

namespace MovieApp.DataAccess.Configurations
{
    public class MovieCountryConfiguration : IEntityTypeConfiguration<MovieCountry>
    {
        public void Configure(EntityTypeBuilder<MovieCountry> builder)
        {
            builder.HasKey(sc => new { sc.MovieId, sc.CountryId });

            builder
                .HasOne(ma => ma.Movie)
                .WithMany(m => m.MovieCountries)
                .HasForeignKey(ma => ma.MovieId);

            builder
                .HasOne(ma => ma.Country)
                .WithMany(a => a.MovieCountries)
                .HasForeignKey(ma => ma.CountryId);
        }
    }
}
