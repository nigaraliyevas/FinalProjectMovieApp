import { Link } from "react-router-dom";
import { faPlay, faChevronDown, faMagnifyingGlass, faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "/node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = index => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <header className={`header py-3 ${isSticky ? "sticky" : ""}`}>
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
                    <Link style={{ fontSize: "22px" }} to="/" className="text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link style={{ fontSize: "22px" }} to="/movies">
                      Movies
                    </Link>
                  </li>
                  <li>
                    <Link style={{ fontSize: "22px" }} to="/tvshows">
                      TV Shows
                    </Link>
                  </li>
                  <li>
                    <Link style={{ fontSize: "22px" }} to="/free-movies">
                      Free Movies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navbar-items__right">
              <ul className="navbar-items__list list-unstyled d-flex align-items-center gap-4 m-0">
                <li style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
                  <FontAwesomeIcon icon={isSearchOpen ? faTimes : faMagnifyingGlass} className="search-icon" onClick={toggleSearch} style={{ cursor: "pointer", color: "#fff" }} />
                  {isSearchOpen && (
                    <div className="search-bar">
                      <input type="text" placeholder="Search .." className="search-input" />
                      <button className="search-btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  )}
                </li>
                <li>
                  <FontAwesomeIcon className="user-icon" icon={faUser} style={{ color: "#ffffff" }} />
                </li>
                <li className="subscribe-bg">
                  <Link to="/subscribe" className="text-uppercase text-decoration-none">
                    Subscribe
                  </Link>
                </li>
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="burger-menu-icon" onClick={toggleMenu} />
              </ul>
            </div>
          </nav>
          <div className={`burger-menu ${isMenuOpen ? "open" : ""}`}>
            <ul className="burger-menu-list list-unstyled">
              <li className={openDropdown === 0 ? "open" : ""}>
                <Link to="/">Home</Link>
              </li>

              <li className={openDropdown === 1 ? "open" : ""}>
                <Link to="/movies">Movies</Link>
              </li>

              <li className={openDropdown === 2 ? "open" : ""}>
                <Link to="/tvshows">TV Shows</Link>
              </li>

              <li className={openDropdown === 3 ? "open" : ""}>
                <Link to="/free-movies">Free Movies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
