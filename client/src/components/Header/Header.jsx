import { Link } from "react-router-dom";
import "./../../../public/assets/common/base.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { faPlay, faChevronDown, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
  return (
    <header className="header py-3">
      <div className="custom-container-lg">
        <div className="header-navbar navbar-items">
          <nav className="navbar-items__default d-flex align-items-center justify-content-between">
            <div className="navbar-items__logo d-flex align-items-center">
              <FontAwesomeIcon className="navbar-items__logo-icon" icon={faPlay} />
              <h2 className="navbar-items__logo-name">
                <Link to="/" className="text-white text-decoration-none">
                  CineSmart
                </Link>
              </h2>
            </div>
            <div className="navbar-items__middle">
              <div className="navbar-items__list-area">
                <ul className="navbar-items__list list-unstyled d-flex gap-4 align-items-center m-0">
                  <li>
                    <Link to="/" className="text-primary">
                      Home
                      <FontAwesomeIcon icon={faChevronDown} style={{ color: "#ffffff", display: "inline-block", marginLeft: "10px" }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/movies">
                      Movies
                      <FontAwesomeIcon icon={faChevronDown} style={{ color: "#ffffff", display: "inline-block", marginLeft: "10px" }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/tv-shows">
                      TV Shows
                      <FontAwesomeIcon icon={faChevronDown} style={{ color: "#ffffff", display: "inline-block", marginLeft: "10px" }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/free-movies">
                      Free Movies
                      <FontAwesomeIcon icon={faChevronDown} style={{ color: "#ffffff", display: "inline-block", marginLeft: "10px" }} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navbar-items__right">
              <ul className="navbar-items__list list-unstyled d-flex align-items-center gap-4 m-0">
                <li>
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
                </li>
                <li>
                  <FontAwesomeIcon className="user-icon" icon={faUser} style={{ color: "#ffffff" }} />
                </li>
                <li className="subscribe-bg">
                  <Link to="/subscribe" className="text-uppercase text-decoration-none">
                    Subscribe
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
