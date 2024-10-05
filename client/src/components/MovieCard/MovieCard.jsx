import { faCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const MovieCard = ({ id, isMovie, title, duration, genre, imgSrc }) => {
  const linkPath = isMovie ? `/movie}` : `/show/${id}`;

  return (
    <div className="">
      <Link to={linkPath}>
        <div className="all-time-container__img">
          <img className="position-relative" width="400px" src={imgSrc} alt={title} />
          <div className="all-time__slider-item-icon position-absolute z-3">
            <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} size="lg" />
          </div>
        </div>
        <div className="movie-infos">
          <h4 className="movie-infos__name mt-2">{title}</h4>
          <span className="movie-infos__duration">{duration}</span>
          <span className="movie-infos__genre">
            <Link to={""}>
              {" "}
              {/*  `/${genre.toLowerCase()}` */}
              <FontAwesomeIcon icon={faCircle} />
              {genre}
            </Link>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
