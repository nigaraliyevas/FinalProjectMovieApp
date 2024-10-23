import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../features/movies/moviesApi"; 
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams(); 
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(id); 
  console.log(movie);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movie details</div>;

  return (
    <section className="movie-detail">
      <h2 className="text-center p-5">{movie.name}</h2>
      <div className="movie-details-content">
        <div className="d-flex gap-3">
          <div className="">
            <strong className="d-block"> Thumb Background Image</strong>
            <img src={movie.thumbBgImgURL} alt={movie.name} width={600} />
          </div>
          <div className="">
            <strong className="d-block">Thumb Image</strong>
            <img src={movie.thumbImgURL} alt={movie.name} width={400} />
          </div>
        </div>
        <p>
          <strong>Released:</strong> {new Date(movie.releasedDate).getFullYear()}
        </p>
        <p>
          <strong>Duration:</strong> {movie.duration} mins
        </p>
        <p>
          <strong>IMDB Rate:</strong> {movie.imdbRate}
        </p>
        <p>
          <strong>Summary:</strong> {movie.summary}
        </p>
        <p>
          <strong>View Count:</strong> {movie.viewCount}
        </p>
        <p>
          <strong>Is Free:</strong> {movie.isFree ? "Yes" : "No"}
        </p>

        <div>
          <strong>Genres:</strong>{" "}
          {movie.genres.map(genre => (
            <span key={genre.id}>{genre.name} </span>
          ))}
        </div>
        <div>
          <strong>Tags:</strong>{" "}
          {movie.tags.map(tag => (
            <span key={tag.id}>{tag.name} </span>
          ))}
        </div>
        <div>
          <strong>Countries:</strong>{" "}
          {movie.countries.map(country => (
            <span key={country.id}>{country.name} </span>
          ))}
        </div>
        <p>
          <strong>Original Language:</strong> {movie.originalLanguageName}
        </p>
      </div>
    </section>
  );
};

export default MovieDetail;
