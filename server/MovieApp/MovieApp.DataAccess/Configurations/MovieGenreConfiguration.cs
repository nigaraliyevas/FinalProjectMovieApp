using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MovieApp.Core.Entities;

namespace MovieApp.DataAccess.Configurations
{
    public class MovieGenreConfiguration : IEntityTypeConfiguration<MovieGenre>
    {
        public void Configure(EntityTypeBuilder<MovieGenre> builder)
        {
            builder.HasKey(sc => new { sc.MovieId, sc.GenreId });

            builder
                .HasOne(ma => ma.Movie)
                .WithMany(m => m.MovieGenres)
                .HasForeignKey(ma => ma.MovieId);

            builder
                .HasOne(ma => ma.Genre)
                .WithMany(a => a.MovieGenres)
                .HasForeignKey(ma => ma.GenreId);
        }
    }
}
