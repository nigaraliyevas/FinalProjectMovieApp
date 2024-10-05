using AutoMapper;
using CG.Web.MegaApiClient;
using MovieApp.Application.Dtos.MovieDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class MovieService : IMovieService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MovieService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<int> Create(MovieCreateDto movieCreateDto)
        {
            if (movieCreateDto == null) throw new CustomException(404, "Null Exception");

            var movieURLUpload = movieCreateDto.MovieURLUpload;
            var movieTrailerURLUpload = movieCreateDto.MovieTrailerURLUpload;

            if (movieURLUpload == null || movieTrailerURLUpload == null || movieURLUpload.Length == 0 || movieTrailerURLUpload.Length == 0)
                throw new CustomException(404, "No File Uploaded");

            using var memoryStreamForMovie = new MemoryStream();
            await movieURLUpload.CopyToAsync(memoryStreamForMovie);

            using var memoryStreamForMovieTrailer = new MemoryStream();
            await movieTrailerURLUpload.CopyToAsync(memoryStreamForMovieTrailer);

            byte[] fileBytesForMovie = memoryStreamForMovie.ToArray();
            byte[] fileBytesForMovieTrailer = memoryStreamForMovieTrailer.ToArray();

            MegaApiClient client = new MegaApiClient();
            await client.LoginAsync("cinesmartapp@gmail.com", "cinesmart2025");

            var megaCloud = await client.GetNodesAsync();
            var parent = megaCloud.FirstOrDefault(n => n.Type == NodeType.Root);

            string fileNameOfMovie = Path.GetFileName(movieURLUpload.FileName);
            string fileNameOfMovieTrailer = Path.GetFileName(movieTrailerURLUpload.FileName);

            var nodeMovie = await client.UploadAsync(new MemoryStream(fileBytesForMovie), fileNameOfMovie, parent);
            var nodeMovieTrailer = await client.UploadAsync(new MemoryStream(fileBytesForMovieTrailer), fileNameOfMovieTrailer, parent);

            string movieDownloadLink = (await client.GetDownloadLinkAsync(nodeMovie)).ToString();
            string movieTrailerDownloadLink = (await client.GetDownloadLinkAsync(nodeMovieTrailer)).ToString();

            movieCreateDto.MovieURL = movieDownloadLink;
            movieCreateDto.MovieTrailerURL = movieTrailerDownloadLink;

            await client.LogoutAsync();

            var newMovie = _mapper.Map<Movie>(movieCreateDto);
            await _unitOfWork.movieRepository.Create(newMovie);
            _unitOfWork.Commit();

            return newMovie.Id;
        }


        public async Task<int> Delete(int id)
        {
            if (id <= 0) throw new CustomException(404, "Invalid ID");

            // Retrieve the movie entity
            var movie = await _unitOfWork.movieRepository.GetEntity(x => x.Id == id);
            if (movie == null) throw new CustomException(404, "Not Found");

            // Initialize the MegaApiClient and login
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

            await _unitOfWork.movieRepository.Delete(movie);
            _unitOfWork.Commit();

            await client.LogoutAsync(); // 

            return movie.Id;
        }



        public async Task<List<Movie>> GetAll()
        {
            return await _unitOfWork.movieRepository.GetAll();
        }

        public Task<List<Movie>> GetAllByGenre(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Movie>> GetAllByName(string name)
        {
            if (name == null) throw new CustomException(404, "Null Exception");
            return await _unitOfWork.movieRepository.GetAll(x => x.Name.ToLower() == name.ToLower());
        }

        public async Task<Movie> GetById(int id)
        {
            if (id == null || id <= 0) throw new CustomException(404, "Null Exception");
            var movie = await _unitOfWork.movieRepository.GetEntity(x => x.Id == id);
            if (movie == null) throw new CustomException(404, "Not Found");
            movie.ViewCount++;
            //update count when it's clicked my front side
            await _unitOfWork.movieRepository.Update(movie);

            return movie;
        }

        public Task<int> Update(MovieUpdateDto movieUpdateDto)
        {
            throw new NotImplementedException();
        }

    }
}
