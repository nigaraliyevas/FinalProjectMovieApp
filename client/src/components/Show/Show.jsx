import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ShowSideBar from "../ShowSideBar/ShowSideBar";
import MovieSideBar from "../MovieSideBar/MovieSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Show.css";

const Show = () => {
  return (
    <section className="show-section">
      <div className="custom-container-lg">
        <div className="show">
          <div className="show-name">
            <Link to="/detail" className="show-name__title">
              <FontAwesomeIcon icon={faCircleInfo} />
              Dahmer 2.Season 9.Episode
            </Link>
          </div>
        </div>
        <div className="show-content d-flex gap-4">
          <MovieSideBar />
          <ShowSideBar />
        </div>
      </div>
    </section>
  );
};

export default Show;
