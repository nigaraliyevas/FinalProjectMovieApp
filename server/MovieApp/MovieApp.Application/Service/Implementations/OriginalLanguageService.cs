using AutoMapper;
using MovieApp.Application.Dtos.OriginalLanguageDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class OriginalLanguageService : IOriginalLanguageService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public OriginalLanguageService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Create(OriginalLanguageCreateDto originalLanguageCreateDto)
        {
            if (originalLanguageCreateDto == null) throw new CustomException(404, "Null Exception");
            var isExist = await _unitOfWork.OriginalLanguageRepository.IsExist(x => x.Name.ToLower() == originalLanguageCreateDto.Name.ToLower());
            if (isExist) throw new CustomException(400, "The Language is exist");
            var newCountry = _mapper.Map<OriginalLanguage>(originalLanguageCreateDto);
            await _unitOfWork.OriginalLanguageRepository.Create(newCountry);
            _unitOfWork.Commit();
            return newCountry.Id;
        }

        public async Task<int> Delete(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var originalLanguage = await _unitOfWork.OriginalLanguageRepository.GetEntity(x => x.Id == id);
            if (originalLanguage == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.OriginalLanguageRepository.Delete(originalLanguage);
            _unitOfWork.Commit();
            return originalLanguage.Id;
        }

        public async Task<List<OriginalLanguage>> GetAll()
        {
            var originalLanguages = await _unitOfWork.OriginalLanguageRepository.GetAll();
            if (originalLanguages == null) throw new CustomException(404, "Not Found");
            return originalLanguages;
        }

        public async Task<OriginalLanguage> GetById(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var originalLanguage = await _unitOfWork.OriginalLanguageRepository.GetEntity(x => x.Id == id);
            if (originalLanguage == null) throw new CustomException(404, "Not Found");
            return originalLanguage;
        }

        public async Task<int> Update(OriginalLanguageUpdateDto originalLanguageUpdateDto, int id)
        {
            if (originalLanguageUpdateDto == null || id <= 0) throw new CustomException(404, "Null Exception");
            var existOriginalLanguage = await _unitOfWork.OriginalLanguageRepository.GetEntity(x => x.Id == id && !(x.Name.ToLower() == originalLanguageUpdateDto.Name));
            if (existOriginalLanguage == null) throw new CustomException(404, "Not Found");
            existOriginalLanguage.Name = originalLanguageUpdateDto.Name;
            existOriginalLanguage.UpdatedDate = DateTime.Now;
            await _unitOfWork.OriginalLanguageRepository.Update(existOriginalLanguage);
            _unitOfWork.Commit();
            return existOriginalLanguage.Id;
        }
    }
}
