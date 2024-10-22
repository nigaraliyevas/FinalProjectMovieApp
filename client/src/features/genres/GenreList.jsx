import { useGetGenresQuery } from "./genresApi";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const GenreList = () => {
  const { data: genres, isLoading, isError, error } = useGetGenresQuery();

  if (isLoading) {
    return <p>Loading genres...</p>;
  }

  if (isError) {
    return <p>Error: {error.data?.message || "Failed to fetch genres"}</p>;
  }

  return (
    <div>
      <ul className="genres-box__list list-unstyled">
        {genres.map(genre => (
          <li className="genres-box__item my-2" key={genre.id}>
            <Link to="/genre">
              <FontAwesomeIcon icon={faFilm} className="me-3" color="#fff" />
              <span className="genres-box__name">{genre.name}</span>
              <span className="genres-box__count ms-1"> ({genre.countMovies})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
