import MovieSideBar from "../MovieSideBar/MovieSideBar";
import ShowSidebar from "../ShowSideBar/ShowSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Movie.css";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../features/movies/moviesApi";

const Movie = () => {
  const { id } = useParams(); 
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);

  if (isLoading) return <p>Loading movie details...</p>;
  if (error) return <p>Error fetching movie: {error.message}</p>;
  return (
    <>
      <section className="movie-section">
        <div className="custom-container-lg">
          <div className="mt-5">
            <div className="d-flex gap-4 movie-wrapper">
              <MovieSideBar data={movie}/>
              <ShowSidebar data={movie} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Movie;
