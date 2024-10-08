using AutoMapper;
using MovieApp.Application.Dtos.GenreDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class GenreService : IGenreService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public GenreService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Create(GenreCreateDto genreCreateDto)
        {
            if (genreCreateDto == null) throw new CustomException(404, "Null Exception");
            var isExist = await _unitOfWork.genreRepository.IsExist(x => x.Name.ToLower() == genreCreateDto.Name.ToLower());
            if (isExist) throw new CustomException(400, "The genre is exist");
            var newGenre = _mapper.Map<Genre>(genreCreateDto);
            await _unitOfWork.genreRepository.Create(newGenre);
            _unitOfWork.Commit();
            return newGenre.Id;
        }

        public async Task<int> Delete(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var genre = await _unitOfWork.genreRepository.GetEntity(x => x.Id == id);
            if (genre == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.genreRepository.Delete(genre);
            _unitOfWork.Commit();
            return genre.Id;
        }

        public async Task<List<Genre>> GetAll()
        {
            var genres = await _unitOfWork.genreRepository.GetAll();
            if (genres == null) throw new CustomException(404, "Not Found");
            return genres;
        }

        public async Task<Genre> GetById(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var genre = await _unitOfWork.genreRepository.GetEntity(x => x.Id == id);
            if (genre == null) throw new CustomException(404, "Not Found");
            return genre;
        }

        public async Task<int> Update(GenreUpdateDto genreUpdateDto, int id)
        {
            if (genreUpdateDto == null || id <= 0) throw new CustomException(404, "Null Exception");
            var existGenre = await _unitOfWork.genreRepository.GetEntity(x => x.Id == id && !(x.Name.ToLower() == genreUpdateDto.Name));
            if (existGenre == null) throw new CustomException(404, "Not Found");
            existGenre.Name = genreUpdateDto.Name;
            existGenre.UpdatedDate = DateTime.Now;
            await _unitOfWork.genreRepository.Update(existGenre);
            _unitOfWork.Commit();
            return existGenre.Id;
        }
    }
}
