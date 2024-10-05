import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieSideBar from "../MovieSideBar/MovieSideBar";
import ShowSidebar from "../ShowSideBar/ShowSideBar";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Movie.css";
import { Link } from "react-router-dom";

const Movie = () => {
  return (
    <>
      <section className="movie-section">
        <div className="custom-container-lg">
          <div className="">
            <div className="movie-name">
              <Link to="/detail" className="movie-name__title">
                <FontAwesomeIcon icon={faCircleInfo} />
                Dahmer 2.Season 9.Episode
              </Link>
            </div>
            <div className="d-flex gap-4">
              <MovieSideBar />
              <ShowSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Movie;
