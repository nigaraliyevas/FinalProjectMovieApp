using AutoMapper;
using MovieApp.Application.Dtos.TagDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class TagService : ITagService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public TagService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Create(TagCreateDto tagCreateDto)
        {
            if (tagCreateDto == null) throw new CustomException(404, "Null Exception");
            var isExist = await _unitOfWork.tagRepository.IsExist(x => x.Name.ToLower() == tagCreateDto.Name.ToLower());
            if (isExist) throw new CustomException(400, "The Tag is exist");
            var newCountry = _mapper.Map<Tag>(tagCreateDto);
            await _unitOfWork.tagRepository.Create(newCountry);
            _unitOfWork.Commit();
            return newCountry.Id;
        }

        public async Task<int> Delete(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var Country = await _unitOfWork.tagRepository.GetEntity(x => x.Id == id);
            if (Country == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.tagRepository.Delete(Country);
            _unitOfWork.Commit();
            return Country.Id;
        }

        public async Task<List<Tag>> GetAll()
        {
            var countries = await _unitOfWork.tagRepository.GetAll();
            if (countries == null) throw new CustomException(404, "Not Found");
            return countries;
        }

        public async Task<Tag> GetById(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var country = await _unitOfWork.tagRepository.GetEntity(x => x.Id == id);
            if (country == null) throw new CustomException(404, "Not Found");
            return country;
        }

        public async Task<int> Update(TagUpdateDto tagUpdateDto, int id)
        {
            if (tagUpdateDto == null || id <= 0) throw new CustomException(404, "Null Exception");
            var existCountry = await _unitOfWork.tagRepository.GetEntity(x => x.Id == id && !(x.Name.ToLower() == tagUpdateDto.Name));
            if (existCountry == null) throw new CustomException(404, "Not Found");
            existCountry.Name = tagUpdateDto.Name;
            existCountry.UpdatedDate = DateTime.Now;
            await _unitOfWork.tagRepository.Update(existCountry);
            _unitOfWork.Commit();
            return existCountry.Id;
        }
    }
}
