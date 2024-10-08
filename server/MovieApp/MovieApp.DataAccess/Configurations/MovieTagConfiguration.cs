using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MovieApp.Core.Entities;

namespace MovieApp.DataAccess.Configurations
{
    public class MovieTagConfiguration : IEntityTypeConfiguration<MovieTag>
    {
        public void Configure(EntityTypeBuilder<MovieTag> builder)
        {
            builder.HasKey(sc => new { sc.MovieId, sc.TagId });

            builder
                .HasOne(ma => ma.Movie)
                .WithMany(m => m.MovieTags)
                .HasForeignKey(ma => ma.MovieId);

            builder
                .HasOne(ma => ma.Tag)
                .WithMany(a => a.MovieTags)
                .HasForeignKey(ma => ma.TagId);
        }
    }
}
