using AutoMapper;
using MovieApp.Application.Dtos.MovieSliderDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class MovieSliderService : IMovieSliderService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MovieSliderService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Create(MovieSliderCreateDto movieSliderCreateDto)
        {
            if (movieSliderCreateDto == null) throw new CustomException(404, "Null Exception");
            var newMovieSlider = _mapper.Map<MovieSlider>(movieSliderCreateDto);
            if (newMovieSlider == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.MovieSliderRepository.Create(newMovieSlider);
            _unitOfWork.Commit();
            return newMovieSlider.Id;
        }

        public async Task<int> Delete(int id)
        {
            if (id == null || id <= 0) throw new CustomException(404, "Null Exception");
            var existMovieSlider = await _unitOfWork.MovieSliderRepository.GetEntity(x => x.Id == id);
            if (existMovieSlider == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.MovieSliderRepository.Delete(existMovieSlider);
            _unitOfWork.Commit();
            return existMovieSlider.Id;
        }
        public async Task<List<MovieSliderReturnDto>> GetAll()
        {
            var sliders = await _unitOfWork.MovieSliderRepository.GetAll(null, "Movie", "Movie.MovieActors.Actor", "Movie.MovieCountries.Country", "Movie.MovieGenres.Genre", "Movie.MovieTags.Tag");

            if (sliders == null) throw new CustomException(404, "Null Exception");


            return _mapper.Map<List<MovieSliderReturnDto>>(sliders);

        }



        public async Task<MovieSlider> GetById(int id)
        {
            var slider = await _unitOfWork.MovieSliderRepository.GetEntity(x => x.Id == id);
            if (slider == null) throw new CustomException(404, "Not Found");
            return slider;
        }

        public async Task<int> Update(MovieSliderUpdateDto movieSliderUpdateDto, int id)
        {
            if (movieSliderUpdateDto == null) throw new CustomException(404, "Null Exception");
            var existSlider = await _unitOfWork.MovieSliderRepository.GetEntity(x => x.Id == id);
            if (existSlider == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.MovieSliderRepository.Update(_mapper.Map<MovieSlider>(existSlider));
            _unitOfWork.Commit();
            return existSlider.Id;
        }
    }
}
