import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./GenreFiter.css";
const GenreList = () => {
  const genres = [
    { name: "Action", count: 33 },
    { name: "Adventure", count: 11 },
    { name: "Animation", count: 3 },
    { name: "Biography", count: 2 },
    { name: "Comedy", count: 7 },
    { name: "Crime", count: 2 },
    { name: "Documentary", count: 2 },
    { name: "Drama", count: 5 },
    { name: "Family", count: 3 },
    { name: "Fantasy", count: 1 },
    { name: "History", count: 2 },
    { name: "Mystery", count: 3 },
    { name: "Romance", count: 3 },
    { name: "Sci-Fi", count: 2 },
    { name: "Sport", count: 1 },
    { name: "Thriller", count: 4 },
  ];
  return (
    <>
      <section className="genres">
        <div className="genres-container">
          <div className="genres-box">
            <h2 className="genres-box__header">Filter By Genre</h2>
            <ul className="genres-box__list list-unstyled">
              {genres.map((genre, index) => (
                <li className="genres-box__item my-2" key={index}>
                  <Link to="/genre">
                    <FontAwesomeIcon icon={faFilm} className="me-3" color="#fff" />
                    <span className="genres-box__name">{genre.name}</span>
                    <span className="genres-box__count ms-1"> ({genre.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default GenreList;
