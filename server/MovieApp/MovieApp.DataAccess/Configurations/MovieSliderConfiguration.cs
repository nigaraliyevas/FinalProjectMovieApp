using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MovieApp.Core.Entities;

namespace MovieApp.DataAccess.Configurations
{
    public class MovieSliderConfiguration : IEntityTypeConfiguration<MovieSlider>
    {
        public void Configure(EntityTypeBuilder<MovieSlider> builder)
        {
            builder.HasKey(ms => ms.Id);

            builder
                .HasOne(ms => ms.Movie)
                .WithOne(m => m.MovieSlider)
                .HasForeignKey<MovieSlider>(ms => ms.MovieId);

        }
    }
}
