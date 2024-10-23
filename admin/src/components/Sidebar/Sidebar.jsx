import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";
import { faChevronDown, faFilm, faGlobe, faHashtag, faPlay, faRightToBracket, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faFlag, faRegistered } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <div className="d-flex align-items-center p-2 mb-5 mt-4">
        <FontAwesomeIcon className="navbar-items__logo-icon" icon={faPlay} />
        <h2 className="navbar-items__logo-name">
          <Link to="/" className="text-white text-decoration-none">
            CineSmart
          </Link>
        </h2>
      </div>

      <div>
        <ul className="nav-items mb-5">
          <li onClick={toggleOpen}>
            <div className="d-flex justify-content-between">
              <div className="">
                <FontAwesomeIcon icon={faFilm} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Movies</span>
              </div>
              <div className="">
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>

            {open && (
              <ul className="submenu">
                <li>
                  <Link to="/movies/">All Movies</Link>
                </li>
                <li>
                  <Link to="/movies/drama">Create Movie</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <FontAwesomeIcon icon={faVideo} color="#fff" className="me-2" />
            <Link to="/genres" className="text-white text-decoration-none">
              Genres
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faHashtag} color="#fff" className="me-2" />
            <Link to="/tags" className="text-white text-decoration-none">
              Tags
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faFlag} color="#fff" className="me-2" />
            <Link to="/countries" className="text-white text-decoration-none">
              Countries
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faGlobe} color="#fff" className="me-2" />
            <Link to="/languages" className="text-white text-decoration-none">
              Languages
            </Link>
          </li>
        </ul>

        <ul className="nav-items mb-3">
          <li>
            <FontAwesomeIcon icon={faRightToBracket} color="#fff" className="me-2" />
            <Link to="/login" className="text-white text-decoration-none">
              Login
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faRegistered} color="#fff" className="me-2" />
            <Link to="/register" className="text-white text-decoration-none">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
