using AutoMapper;
using MovieApp.Application.Dtos.CountryDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class CountryService : ICountryService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CountryService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Create(CountryCreateDto countryCreateDto)
        {
            if (countryCreateDto == null) throw new CustomException(404, "Null Exception");
            var isExist = await _unitOfWork.countryRepository.IsExist(x => x.Name.ToLower() == countryCreateDto.Name.ToLower());
            if (isExist) throw new CustomException(400, "The Country is exist");
            var newCountry = _mapper.Map<Country>(countryCreateDto);
            await _unitOfWork.countryRepository.Create(newCountry);
            _unitOfWork.Commit();
            return newCountry.Id;
        }

        public async Task<int> Delete(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var country = await _unitOfWork.countryRepository.GetEntity(x => x.Id == id);
            if (country == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.countryRepository.Delete(country);
            _unitOfWork.Commit();
            return country.Id;
        }

        public async Task<List<Country>> GetAll()
        {
            var countries = await _unitOfWork.countryRepository.GetAll();
            if (countries == null) throw new CustomException(404, "Not Found");
            return countries;
        }

        public async Task<Country> GetById(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var country = await _unitOfWork.countryRepository.GetEntity(x => x.Id == id);
            if (country == null) throw new CustomException(404, "Not Found");
            return country;
        }

        public async Task<int> Update(CountryUpdateDto countryUpdateDto, int id)
        {
            if (countryUpdateDto == null || id <= 0) throw new CustomException(404, "Null Exception");
            var existCountry = await _unitOfWork.countryRepository.GetEntity(x => x.Id == id && !(x.Name.ToLower() == countryUpdateDto.Name));
            if (existCountry == null) throw new CustomException(404, "Not Found");
            existCountry.Name = countryUpdateDto.Name;
            existCountry.UpdatedDate = DateTime.Now;
            await _unitOfWork.countryRepository.Update(existCountry);
            _unitOfWork.Commit();
            return existCountry.Id;
        }

    }
}
