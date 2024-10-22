namespace MovieApp.DataAccess.Configurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using MovieApp.Core.Entities;
    public class MovieConfiguration : IEntityTypeConfiguration<Movie>
    {
        public void Configure(EntityTypeBuilder<Movie> builder)
        {
            builder.Property(m => m.Name).IsRequired(true).HasMaxLength(1200);
            builder.Property(m => m.Duration).IsRequired(true);
            builder.Property(m => m.Summary).IsRequired(true);
            builder.Property(m => m.ReleasedDate).IsRequired(true);
        }
    }
}
