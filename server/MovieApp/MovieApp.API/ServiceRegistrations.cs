﻿using FluentValidation;
using FluentValidation.AspNetCore;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MovieApp.Application.Dtos.MovieDtos;
using MovieApp.Application.Profiles;
using MovieApp.Application.Service.Implementations;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Application.Services;
using MovieApp.Application.Settings;
using MovieApp.Core.Entities;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Data;
using MovieApp.DataAccess.Implementations;
using MovieApp.DataAccess.Implementations.UnitOfWork;
using Newtonsoft.Json;
using Stripe;
using System.Text;

namespace MovieApp.API
{
    public static class ServiceRegistration
    {
        public static void Register(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
                })
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

            services.AddScoped<IPlanRoleNameService, PlanRoleNameService>();
            services.AddScoped<IPlanRoleNameRepository, PlanRoleNameRepository>();

            services.AddScoped<ISubscriptionPlanService, SubscriptionPlanService>();
            services.AddScoped<ISubscriptionPlanRepository, SubscriptionPlanRepository>();

            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddScoped<IMovieSliderService, MovieSliderService>();
            services.AddScoped<IMovieSliderRepository, MovieSliderRepository>();


            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<ICommentRepository, CommentRepository>();


            services.AddScoped<IMovieActorRepository, MovieActorRepository>();

            services.AddScoped<IMovieGenreRepository, MovieGenreRepository>();

            services.AddScoped<IMovieCountryRepository, MovieCountryRepository>();

            services.AddScoped<IMovieTagRepository, MovieTagRepository>();


            //services.AddScoped<IPaymentService, StripePaymentService>(); // Replace FakePaymentService with StripePaymentService


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

            //Jwt Bearer send in UI
            services.AddSwaggerGen(opt =>
            {
                opt.SwaggerDoc("v1", new OpenApiInfo { Title = "MyAPI", Version = "v1" });
                opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });

                opt.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                 });
            });

            //CORS Policy
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("http://localhost:5173")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod());
            });

            //Stripe
            StripeConfiguration.ApiKey = config["Stripe:SecretKey"];

            services.AddScoped<IPaymentService, StripePaymentService>();


        }
    }
}
