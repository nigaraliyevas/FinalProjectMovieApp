import { faCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../features/movies/moviesApi";

const MovieCard = ({ id, title, duration, genres, imgSrc, isFree, width, height, location }) => {
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);

  return (
    <div className="">
      <Link to={`${location == null ? "/Movie/" : "/Movie/"}${id}`}>
        <div className="all-time-container__img" style={{ width: width, height: height }}>
          <img className="position-relative" src={imgSrc} alt={title} />
          <div className="all-time__slider-item-icon position-absolute z-3">{/* <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} size="lg" /> */}</div>
        </div>
        <div className="movie-infos">
          <h4 className="movie-infos__name mt-2">{title}</h4>
          <span className="movie-infos__duration">{duration}</span>
          <span className="movie-infos__genre">
            {genres?.map(genre => (
              <span key={genre.id} className="ms-2">
                <FontAwesomeIcon icon={faCircle} className="me-1" />
                {genre.name + ""}
              </span>
            ))}
          </span>
          <div className="free-info">{isFree && <span>Free</span>}</div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
