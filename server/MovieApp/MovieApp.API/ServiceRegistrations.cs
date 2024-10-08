﻿using Api_EntityConfiguration_Validator_Dtos.Settings;
using FluentValidation;
using FluentValidation.AspNetCore;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieApp.Application.Dtos.MovieDtos;
using MovieApp.Application.Profiles;
using MovieApp.Application.Service.Implementations;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;
using MovieApp.DataAccess.Implementations;
using MovieApp.DataAccess.Implementations.UnitOfWork;
using System.Text;

namespace MovieApp.API
{
    public static class ServiceRegistration
    {
        public static void Register(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers()
            .ConfigureApiBehaviorOptions(opt =>
            {
                opt.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState.Where(e => e.Value?.Errors.Count > 0)
                    .Select(x => new Dictionary<string, string>() { { x.Key, x.Value.Errors.First().ErrorMessage } });
                    return new BadRequestObjectResult(new { message = (string)null, errors });
                };
            });

            services.AddControllersWithViews();

            services.AddHttpContextAccessor();
            services.AddFluentValidationAutoValidation();
            services.AddFluentValidationClientsideAdapters();
            services.AddValidatorsFromAssemblyContaining<MovieCreateDto>();
            services.AddFluentValidationRulesToSwagger();


            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IMovieRepository, MovieRepository>();

            services.AddScoped<IActorService, ActorService>();
            services.AddScoped<IActorRepository, ActorRepository>();

            services.AddScoped<IGenreService, GenreService>();
            services.AddScoped<IGenreRepository, GenreRepository>();

            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<ICountryRepository, CountryRepository>();

            services.AddScoped<ITagService, TagService>();
            services.AddScoped<ITagRepository, TagRepository>();

            services.AddScoped<IOriginalLanguageService, OriginalLanguageService>();
            services.AddScoped<IOriginalLanguageRepository, OriginalLanguageRepository>();

            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<ICommentRepository, CommentRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddAutoMapper(opt =>
            {
                opt.AddProfile(new MapperProfile());
            });

            services.AddHttpContextAccessor();

            services.AddIdentity<AppUser, IdentityRole>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = true;
                opt.Password.RequiredLength = 6;
                opt.Password.RequireDigit = true;
                opt.Password.RequireLowercase = true;
                opt.Password.RequireUppercase = true;
            }).AddEntityFrameworkStores<MovieAppDbContext>().AddDefaultTokenProviders();
            services.Configure<JwtSettings>(config.GetSection("Jwt"));

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = config["Jwt:Issuer"],
                    ValidAudience = config["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:SecretKey"])),
                };
            });

            //services.AddScoped<ICategoryService, CategoryService>();
        }
    }
}
