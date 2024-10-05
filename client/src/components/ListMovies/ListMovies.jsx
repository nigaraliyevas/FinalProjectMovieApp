import MovieCard from "../MovieCard/MovieCard";
import { allTimeHits } from "../MoviesSlider/MoviesSlider";
const ListMovies = () => {
  return (
    <>
      <section className="cards">
        <div className="d-flex flex-wrap gap-4 ">
          {allTimeHits.map(item => (
            <div className="col-lg-3  col-md-2" key={item.id}>
              <MovieCard id={item.id} title={item.title} duration={item.duration} genre={item.genre} isMovie={"/movie"} imgSrc={item.imgSrc} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ListMovies;
