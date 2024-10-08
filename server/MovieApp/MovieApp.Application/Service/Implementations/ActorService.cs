using AutoMapper;
using MovieApp.Application.Dtos.ActorDtos;
using MovieApp.Application.Exceptions;
using MovieApp.Application.Service.Interfaces;
using MovieApp.Core.Entities;
using MovieApp.DataAccess.Implementations.UnitOfWork;

namespace MovieApp.Application.Service.Implementations
{
    public class ActorService : IActorService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ActorService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Create(ActorCreateDto actorCreateDto)
        {
            if (actorCreateDto == null) throw new CustomException(404, "Null Exception");
            var newActor = _mapper.Map<Actor>(actorCreateDto);
            await _unitOfWork.actorRepository.Create(newActor);
            _unitOfWork.Commit();
            return newActor.Id;
        }

        public async Task<int> Delete(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var actor = await _unitOfWork.actorRepository.GetEntity(x => x.Id == id);
            if (actor == null) throw new CustomException(404, "Not Found");
            await _unitOfWork.actorRepository.Delete(actor);
            _unitOfWork.Commit();
            return actor.Id;
        }

        public async Task<List<Actor>> GetAll()
        {
            var actors = await _unitOfWork.actorRepository.GetAll();
            if (actors == null) throw new CustomException(404, "Not Found");
            return actors;
        }

        public async Task<List<Actor>> GetAllByMovieId(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var actors = await _unitOfWork.actorRepository.GetAll(x => x.MovieActors.Any(ma => ma.MovieId == id), "MovieActors");
            if (actors == null) throw new CustomException(404, "Not Found");
            var actorDtos = actors.Select(a => new Actor
            {
                Id = a.Id,
                FullName = a.FullName,
            }).ToList();
            return actorDtos;
        }

        public async Task<Actor> GetById(int id)
        {
            if (id <= 0 || id == null) throw new CustomException(404, "Null Exception");
            var actor = await _unitOfWork.actorRepository.GetEntity(x => x.Id == id);
            if (actor == null) throw new CustomException(404, "Not Found");
            return actor;
        }

        public async Task<int> Update(ActorUpdateDto actorUpdateDto, int id)
        {
            if (actorUpdateDto == null) throw new CustomException(404, "Null Exception");
            var existActor = await _unitOfWork.actorRepository.GetEntity(x => x.Id == id);
            if (existActor == null) throw new CustomException(404, "Not Found");
            existActor.FullName = actorUpdateDto.FullName;
            existActor.UpdatedDate = DateTime.Now;
            await _unitOfWork.actorRepository.Update(existActor);
            _unitOfWork.Commit();
            return existActor.Id;
        }
    }
}
