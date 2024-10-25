using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using MovieApp.API;
using MovieApp.API.Middlewares.ExceptionMiddleware;
using MovieApp.DataAccess.Data;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(option =>
{
    option.Limits.MaxRequestBodySize = long.MaxValue; // Setting MaxRequestBodySize to a large value
});
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 9052428800; // 50 MB limit
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var config = builder.Configuration;
builder.Services.Register(config);
builder.Services.AddDbContext<MovieAppDbContext>(options =>
{
    options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
}, ServiceLifetime.Transient);


var app = builder.Build();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");

app.UseStaticFiles();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
