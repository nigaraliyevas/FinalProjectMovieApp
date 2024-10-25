import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sidebar.css";
import { faCalendarWeek, faChevronDown, faFilm, faGlobe, faHashtag, faMasksTheater, faPlay, faRightToBracket, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faFlag, faRegistered } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Sidebar = () => {
  // State for each submenu
  const [openMovies, setOpenMovies] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [openTags, setOpenTags] = useState(false);
  const [openCountries, setOpenCountries] = useState(false);
  const [openLanguages, setOpenLanguages] = useState(false);
  const [openActors, setOpenActors] = useState(false);
  const [openPlan, setOpenPlans] = useState(false);
  const [openNamePlan, setOpenNamePlans] = useState(false);

  // Toggle functions
  const toggleMovies = () => setOpenMovies(!openMovies);
  const toggleGenres = () => setOpenGenres(!openGenres);
  const toggleTags = () => setOpenTags(!openTags);
  const toggleCountries = () => setOpenCountries(!openCountries);
  const toggleLanguages = () => setOpenLanguages(!openLanguages);
  const toggleActors = () => setOpenActors(!openActors);
  const togglePlan = () => setOpenPlans(!openPlan);
  const toggleNamePlan = () => setOpenNamePlans(!openNamePlan);

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
          {/* Movies */}
          <li onClick={toggleMovies}>
            <div className="d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faFilm} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Movies</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>
            <ul className={`submenu ${openMovies ? "open" : ""}`}>
              <li>
                <Link to="/movies/">All Movies</Link>
              </li>
              <li>
                <Link to="/movie/create">Create Movie</Link>
              </li>
            </ul>
          </li>

          {/* Genres */}
          <li onClick={toggleGenres}>
            <div className="d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faVideo} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Genres</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>
            <ul className={`submenu ${openGenres ? "open" : ""}`}>
              <li>
                <Link to="/genres/">All Genres</Link>
              </li>
              <li>
                <Link to="/genres/create">Create Genre</Link>
              </li>
            </ul>
          </li>

          {/* Tags */}
          <li onClick={toggleTags}>
            <div className="d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faHashtag} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Tags</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>
            <ul className={`submenu ${openTags ? "open" : ""}`}>
              <li>
                <Link to="/tags/">All Tags</Link>
              </li>
              <li>
                <Link to="/tags/create">Create Tag</Link>
              </li>
            </ul>
          </li>

          {/* Countries */}
          <li onClick={toggleCountries}>
            <div className="d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faFlag} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Countries</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>
            <ul className={`submenu ${openCountries ? "open" : ""}`}>
              <li>
                <Link to="/countries">All Countries</Link>
              </li>
              <li>
                <Link to="/countries/create">Create Country</Link>
              </li>
            </ul>
          </li>

          {/* Languages */}
          <li onClick={toggleLanguages}>
            <div className="d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faGlobe} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Languages</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>
            <ul className={`submenu ${openLanguages ? "open" : ""}`}>
              <li>
                <Link to="/languages/">All Languages</Link>
              </li>
              <li>
                <Link to="/languages/create">Create Language</Link>
              </li>
            </ul>
          </li>
          <li onClick={toggleActors}>
            <div className="d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faMasksTheater} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Actors</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>
            <ul className={`submenu ${openActors ? "open" : ""}`}>
              <li>
                <Link to="/actors/">All Actors</Link>
              </li>
              <li>
                <Link to="/actors/create">Create Actor</Link>
              </li>
            </ul>
          </li>
          <li onClick={togglePlan}>
            <div className="d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faCalendarWeek} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Subscription Plans</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>
            <ul className={`submenu ${openPlan ? "open" : ""}`}>
              <li>
                <Link to="/plans/">All Subscription Plans </Link>
              </li>
              <li>
                <Link to="/plans/create">Create Subscription Plan</Link>
              </li>
            </ul>
          </li>
          <li onClick={toggleNamePlan}>
            <div className="d-flex justify-content-between">
              <div>
                <FontAwesomeIcon icon={faMasksTheater} color="#fff" className="me-2" />
                <span style={{ cursor: "pointer" }}>Plan Name</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faChevronDown} color="#fff" className="ms-5" />
              </div>
            </div>
            <ul className={`submenu ${openNamePlan ? "open" : ""}`}>
              <li>
                <Link to="/planNames/">All Plan Names</Link>
              </li>
              <li>
                <Link to="/planNames/create">Create Plan Name</Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* Login / Register */}
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
