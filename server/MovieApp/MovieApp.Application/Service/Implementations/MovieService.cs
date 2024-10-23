using AutoMapper;
using CG.Web.MegaApiClient;
using Microsoft.AspNetCore.Http;
using MovieApp.Application.Dtos.MovieDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Extensions.Extension;
using MovieApp.Application.Helpers.Helper;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.Core.Entities.Common;
using MovieApp.Core.Repositories;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public MovieService(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<int> Create(MovieCreateDto movieCreateDto)
        {
            if (movieCreateDto == null) throw new CustomException(404, "Null Movie data.");

            FileUploadCheck(movieCreateDto.MovieURLUpload, "Movie file");
            FileUploadCheck(movieCreateDto.MovieTrailerURLUpload, "Movie trailer file");

            var movieDownloadLink = await UploadVideo(movieCreateDto.MovieURLUpload);
            var movieTrailerDownloadLink = await UploadVideo(movieCreateDto.MovieTrailerURLUpload);

            var newMovie = _mapper.Map<Movie>(movieCreateDto);

            newMovie.MovieURL = movieDownloadLink;
            newMovie.MovieTrailerURL = movieTrailerDownloadLink;

            newMovie.ThumbImg = await SaveImage(movieCreateDto.ThumbImgUpload, "thumbnails", "thumbnail image");
            newMovie.ThumbBgImg = await SaveImage(movieCreateDto.ThumbBgImgUpload, "backgrounds", "background image");

            try
            {
                await _unitOfWork.MovieRepository.Create(newMovie);

                //loop for save pivot tables relation
                await SavePivotTables(newMovie.MovieTags, _unitOfWork.MovieTagRepository);
                await SavePivotTables(newMovie.MovieActors, _unitOfWork.MovieActorRepository);
                await SavePivotTables(newMovie.MovieCountries, _unitOfWork.MovieCountryRepository);
                await SavePivotTables(newMovie.MovieGenres, _unitOfWork.MovieGenreRepository);

                _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                throw new CustomException(500, $"Database error: {ex.Message}");
            }

            return newMovie.Id;
        }

        public async Task<int> Delete(int id)
        {
            if (id == null || id <= 0) throw new CustomException(404, "Not Found");

            var movie = await _unitOfWork.MovieRepository.GetEntity(x => x.Id == id);
            if (movie == null) throw new CustomException(404, "Not Found");

            Helper.DeleteImageFromFolder(movie.ThumbImg, "thumbnails");
            Helper.DeleteImageFromFolder(movie.ThumbBgImg, "backgrounds");

            MegaApiClient client = new MegaApiClient();
            await client.LoginAsync("cinesmartapp@gmail.com", "cinesmart2025");

            var megaCloud = await client.GetNodesAsync();

            var movieNode = megaCloud.FirstOrDefault(n => n.Name == Path.GetFileName(movie.MovieURL));
            if (movieNode != null)
            {
                await client.DeleteAsync(movieNode);
            }

            var trailerNode = megaCloud.FirstOrDefault(n => n.Name == Path.GetFileName(movie.MovieTrailerURL));
            if (trailerNode != null)
            {
                await client.DeleteAsync(trailerNode);
            }

            await client.LogoutAsync();

            await _unitOfWork.MovieRepository.Delete(movie);
            _unitOfWork.Commit();

            return movie.Id;
        }
        public async Task<int> Update(int id, MovieUpdateDto movieUpdateDto)
        {
            if (movieUpdateDto == null) throw new CustomException(404, "Null Movie data.");
            var existMovie = await _unitOfWork.MovieRepository.GetEntity(x => x.Id == movieUpdateDto.Id,
             "MovieActors.Actor",
             "MovieCountries.Country",
             "MovieGenres.Genre",
             "MovieTags.Tag",
             "Comments",
             "Comments.AppUser",
             "MovieSlider"
             );

            if (existMovie == null)
                throw new CustomException(404, "Not found.");

            if (existMovie == null) throw new CustomException(404, "Movie not found.");

            _mapper.Map(movieUpdateDto, existMovie);
            var originalLanguage = await _unitOfWork.OriginalLanguageRepository.GetEntity(x => x.Id == existMovie.OriginalLanguageId);
            existMovie.OriginalLanguage.Name = originalLanguage.Name;
            existMovie.UpdatedDate = DateTime.Now;

            if (movieUpdateDto.MovieURLUpload != null)
            {
                await DeleteVideo(existMovie.MovieURL);

                existMovie.MovieURL = await UploadVideo(movieUpdateDto.MovieURLUpload);
            }

            if (movieUpdateDto.MovieTrailerURLUpload != null)
            {
                await DeleteVideo(existMovie.MovieTrailerURL);

                existMovie.MovieTrailerURL = await UploadVideo(movieUpdateDto.MovieTrailerURLUpload);
            }

            if (movieUpdateDto.ThumbImgUpload != null)
            {
                Helper.DeleteImageFromFolder(existMovie.ThumbImg, "thumbnails");
                existMovie.ThumbImg = await SaveImage(movieUpdateDto.ThumbImgUpload, "thumbnails", "thumbnail image");
            }

            if (movieUpdateDto.ThumbBgImgUpload != null)
            {
                Helper.DeleteImageFromFolder(existMovie.ThumbBgImg, "backgrounds");
                existMovie.ThumbBgImg = await SaveImage(movieUpdateDto.ThumbBgImgUpload, "backgrounds", "background image");
            }


            await SavePivotTables(existMovie.MovieTags, _unitOfWork.MovieTagRepository);
            await SavePivotTables(existMovie.MovieActors, _unitOfWork.MovieActorRepository);
            await SavePivotTables(existMovie.MovieCountries, _unitOfWork.MovieCountryRepository);
            await SavePivotTables(existMovie.MovieGenres, _unitOfWork.MovieGenreRepository);

            try
            {
                _unitOfWork.MovieRepository.Update(existMovie);
                _unitOfWork.Commit();
            }
            catch (Exception ex)
            {
                throw new CustomException(500, $"Update failed: {ex.Message}");
            }

            return existMovie.Id;
        }

        public MovieListDto GetAll(string? search, int pageSize, int page)
        {
            IQueryable<Movie> query = _unitOfWork.MovieRepository.GetAllAsQeuryable(
                    null,
                    "MovieActors.Actor",
                    "MovieCountries.Country",
                    "MovieGenres.Genre",
                    "MovieTags.Tag",
                    "Comments",
                    "Comments.AppUser",
                    "OriginalLanguage",
                    "MovieSlider",
                    "WatchedByUsers"

                );

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.Name.ToLower().Contains(search.ToLower()));
            }

            int totalCount = query.Count();

            List<Movie> paginatedMovies = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            if (paginatedMovies == null) throw new CustomException(404, "Not Found");

            List<MovieReturnDto> movieDtos = _mapper.Map<List<MovieReturnDto>>(paginatedMovies);


            MovieListDto movieListDto = new()
            {
                Page = page,
                TotalCount = totalCount,
                Items = movieDtos
            };

            return movieListDto;
        }

        public MovieListDto GetAllByYear(int year, int pageSize, int page)
        {
            if (year == 0) throw new CustomException(404, "Not Found");
            IQueryable<Movie> query = _unitOfWork.MovieRepository.GetAllAsQeuryable(
                null,
                "MovieActors.Actor",
                "MovieCountries.Country",
                "MovieGenres.Genre",
                "MovieTags.Tag",
                "OriginalLanguage",
                "MovieSlider",
                "Comments",
                "Comments.AppUser",
                "WatchedByUsers"

            );

            query = query.Where(x => x.ReleasedDate.Year == year);
            if (query == null) throw new CustomException(404, "Not Found");

            int totalCount = query.Count();

            List<Movie> paginatedMovies = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            if (paginatedMovies == null) throw new CustomException(404, "Not Found");

            List<MovieReturnDto> movieDtos = _mapper.Map<List<MovieReturnDto>>(paginatedMovies);

            MovieListDto movieListDto = new()
            {
                Page = page,
                TotalCount = totalCount,
                Items = movieDtos
            };

            return movieListDto;
        }
        public MovieListDto GetAllFree(int pageSize, int page)
        {
            IQueryable<Movie> query = _unitOfWork.MovieRepository.GetAllAsQeuryable(
                null,
                "MovieActors.Actor",
                "MovieCountries.Country",
                "MovieGenres.Genre",
                "MovieTags.Tag",
                "Comments",
                "Comments.AppUser",
                "OriginalLanguage",
                "MovieSlider",
                "WatchedByUsers"

            );

            query = query.Where(x => x.IsFree);
            if (query == null) throw new CustomException(404, "Not Found");

            int totalCount = query.Count();

            List<Movie> paginatedMovies = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            if (paginatedMovies == null) throw new CustomException(404, "Not Found");

            List<MovieReturnDto> movieDtos = _mapper.Map<List<MovieReturnDto>>(paginatedMovies);

            MovieListDto movieListDto = new()
            {
                Page = page,
                TotalCount = totalCount,
                Items = movieDtos
            };
            return movieListDto;
        }

        public MovieListDto GetAllByGenre(string name, int pageSize, int page)
        {
            if (name == null) throw new CustomException(404, "Null Exception");

            IQueryable<Movie> query = _unitOfWork.MovieRepository.GetAllAsQeuryable(
                 null,
                 "MovieActors.Actor",
                 "MovieCountries.Country",
                 "MovieGenres.Genre",
                 "MovieTags.Tag",
                 "Comments",
                 "Comments.AppUser",
                 "OriginalLanguage",
                 "MovieSlider",
                 "WatchedByUsers"

             );
            query = query.Where(x => x.MovieGenres.Any(mg => mg.Genre.Name.ToLower() == name.ToLower()));

            if (query == null) throw new CustomException(404, "Not Found");

            int totalCount = query.Count();

            List<Movie> paginatedMovies = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            if (paginatedMovies == null) throw new CustomException(404, "Not Found");

            List<MovieReturnDto> movieDtos = _mapper.Map<List<MovieReturnDto>>(paginatedMovies);

            MovieListDto movieListDto = new()
            {
                Page = page,
                TotalCount = totalCount,
                Items = movieDtos
            };
            return movieListDto;
        }

        public MovieListDto GetAllByName(string name, int pageSize, int page)
        {
            if (name == null) throw new CustomException(404, "Null Exception");

            IQueryable<Movie> query = _unitOfWork.MovieRepository.GetAllAsQeuryable(
                 null,
                 "MovieActors.Actor",
                 "MovieCountries.Country",
                 "MovieGenres.Genre",
                 "MovieTags.Tag",
                 "Comments",
                 "Comments.AppUser",
                 "OriginalLanguage",
                 "MovieSlider",
                 "WatchedByUsers"

             );
            query = query.Where(x => x.Name.ToLower().Contains(name.ToLower()));

            if (query == null) throw new CustomException(404, "Not Found");

            int totalCount = query.Count();

            List<Movie> paginatedMovies = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            if (paginatedMovies == null) throw new CustomException(404, "Not Found");

            List<MovieReturnDto> movieDtos = _mapper.Map<List<MovieReturnDto>>(paginatedMovies);

            MovieListDto movieListDto = new()
            {
                Page = page,
                TotalCount = totalCount,
                Items = movieDtos
            };
            return movieListDto;
        }

        public async Task<MovieReturnDto> GetById(int id)
        {
            if (id == null || id <= 0) throw new CustomException(404, "Null Exception");

            var existMovie = _unitOfWork.MovieRepository.GetAllAsQeuryable(
                 null,
                 "MovieActors.Actor",
                 "MovieCountries.Country",
                 "MovieGenres.Genre",
                 "MovieTags.Tag",
                 "Comments",
                "Comments.AppUser",
                 "OriginalLanguage",
                 "MovieSlider",
                 "WatchedByUsers"

            ).FirstOrDefault(x => x.Id == id);
            if (existMovie == null) throw new CustomException(404, "Not Found");
            existMovie.ViewCount++;
            await _unitOfWork.MovieRepository.Update(existMovie);
            _unitOfWork.Commit();
            var movie = _mapper.Map<MovieReturnDto>(existMovie);
            return movie;
        }

        public MovieListDto Filter(int? year, string? genre, string language, int page, int pageSize)
        {
            IQueryable<Movie> query = _unitOfWork.MovieRepository.GetAllAsQeuryable(
                 null,
                 "MovieActors.Actor",
                 "MovieCountries.Country",
                 "MovieGenres.Genre",
                 "MovieTags.Tag",
                 "Comments",
                 "Comments.AppUser",
                 "OriginalLanguage",
                 "MovieSlider",
                 "WatchedByUsers"

                );

            if (year != null)
            {
                query = query.Where(m => m.ReleasedDate.Year == year);
            }

            if (!string.IsNullOrEmpty(genre))
            {
                query = query.Where(m => m.MovieGenres.Any(g => g.Genre.Name.ToLower() == genre.ToLower()));
            }

            if (!string.IsNullOrEmpty(language))
            {
                query = query.Where(m => m.OriginalLanguage.Name.ToLower() == language.ToLower());
            }

            int totalCount = query.Count();
            List<Movie> paginatedMovies = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            if (paginatedMovies == null) throw new CustomException(404, "Not Found");

            List<MovieReturnDto> movieDtos = _mapper.Map<List<MovieReturnDto>>(paginatedMovies);

            MovieListDto movieListDto = new()
            {
                Page = page,
                TotalCount = totalCount,
                Items = movieDtos
            };
            return movieListDto;
        }


        //Private Methods for make readable

        private void FileUploadCheck(IFormFile file, string fileType)
        {
            if (file == null)
            {
                throw new CustomException(400, $"Couldn't {fileType} uploaded.");
            }
        }

        private async Task<string> UploadVideo(IFormFile file)
        {
            try
            {
                MegaApiClient client = new MegaApiClient();
                await client.LoginAsync("cinesmartapp@gmail.com", "cinesmart2025");

                var megaCloud = await client.GetNodesAsync();
                var parent = megaCloud.FirstOrDefault(n => n.Type == NodeType.Root);

                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);

                var uploadedNode = await client.UploadAsync(new MemoryStream(memoryStream.ToArray()), file.FileName, parent);
                var downloadLink = (await client.GetDownloadLinkAsync(uploadedNode)).ToString();

                await client.LogoutAsync();

                return downloadLink;
            }
            catch (Exception ex)
            {
                throw new CustomException(500, $"Couldn't {file.FileName} to Mega Cloud: {ex.Message}");
            }
        }

        private async Task DeleteVideo(string fileUrl)
        {
            try
            {
                if (string.IsNullOrEmpty(fileUrl)) return;

                MegaApiClient client = new MegaApiClient();
                await client.LoginAsync("cinesmartapp@gmail.com", "cinesmart2025");

                var nodes = await client.GetNodesAsync();

                var fileName = Path.GetFileName(new Uri(fileUrl).AbsolutePath);

                var nodeToDelete = nodes.FirstOrDefault(n => n.Name == fileName);

                if (nodeToDelete != null)
                {
                    await client.DeleteAsync(nodeToDelete);
                }

                await client.LogoutAsync();
            }
            catch (Exception ex)
            {
                throw new CustomException(500, $"Failed to delete file from Mega Cloud: {ex.Message}");
            }
        }

        private async Task<string> SaveImage(string base64Image, string folder, string imageType)
        {
            if (!string.IsNullOrEmpty(base64Image) && base64Image.CheckContentType("image") && !base64Image.CheckSize(1024))
            {
                return await base64Image.SaveFile(folder, _httpContextAccessor);
            }
            else if (!string.IsNullOrEmpty(base64Image))
            {
                throw new CustomException(400, $"Make sure {imageType} is an image or the size is not too large.");
            }

            return null;
        }


        private async Task SavePivotTables<T>(List<T> entities, IRepository<T> repository) where T : BaseEntity
        {
            if (entities != null)
            {
                foreach (var entity in entities)
                {
                    await repository.Create(entity);
                }
            }
        }
    }
}