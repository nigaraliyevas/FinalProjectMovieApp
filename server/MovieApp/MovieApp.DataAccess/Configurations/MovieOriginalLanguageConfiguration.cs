using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MovieApp.Core.Entities;

namespace MovieApp.DataAccess.Configurations
{
    public class MovieOriginalLanguageConfiguration : IEntityTypeConfiguration<OriginalLanguage>
    {
        public void Configure(EntityTypeBuilder<OriginalLanguage> builder)
        {
            builder.HasKey(ms => ms.Id);

            builder
                .HasOne(ms => ms.Movie)
                .WithOne(m => m.OriginalLanguage)
                .HasForeignKey<OriginalLanguage>(ms => ms.MovieId);
        }
    }
}
