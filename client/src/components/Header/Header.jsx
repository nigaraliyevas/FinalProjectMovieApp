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
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown
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
                <a href="#" onClick={() => toggleDropdown(0)}>
                  Home
                  <FontAwesomeIcon icon={faChevronDown} />
                </a>
                {openDropdown === 0 && (
                  <ul className="submenu">
                    <li>
                      <Link to="/home-subcategory-1">Home Subcategory 1</Link>
                    </li>
                    <li>
                      <Link to="/home-subcategory-2">Home Subcategory 2</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className={openDropdown === 1 ? "open" : ""}>
                <a href="#" onClick={() => toggleDropdown(1)}>
                  Movies
                  <FontAwesomeIcon icon={faChevronDown} />
                </a>
                {openDropdown === 1 && (
                  <ul className="submenu">
                    <li>
                      <Link to="/movies-subcategory-1">Movies Subcategory 1</Link>
                    </li>
                    <li>
                      <Link to="/movies-subcategory-2">Movies Subcategory 2</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className={openDropdown === 2 ? "open" : ""}>
                <a href="#" onClick={() => toggleDropdown(2)}>
                  TV Shows
                  <FontAwesomeIcon icon={faChevronDown} />
                </a>
                {openDropdown === 2 && (
                  <ul className="submenu">
                    <li>
                      <Link to="/tvshows-subcategory-1">TV Shows Subcategory 1</Link>
                    </li>
                    <li>
                      <Link to="/tvshows-subcategory-2">TV Shows Subcategory 2</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className={openDropdown === 3 ? "open" : ""}>
                <a href="#" onClick={() => toggleDropdown(3)}>
                  Video
                  <FontAwesomeIcon icon={faChevronDown} />
                </a>
                {openDropdown === 3 && (
                  <ul className="submenu">
                    <li>
                      <Link to="/video-subcategory-1">Video Subcategory 1</Link>
                    </li>
                    <li>
                      <Link to="/video-subcategory-2">Video Subcategory 2</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className={openDropdown === 4 ? "open" : ""}>
                <a href="#" onClick={() => toggleDropdown(4)}>
                  Pages
                  <FontAwesomeIcon icon={faChevronDown} />
                </a>
                {openDropdown === 4 && (
                  <ul className="submenu">
                    <li>
                      <Link to="/pages-subcategory-1">Pages Subcategory 1</Link>
                    </li>
                    <li>
                      <Link to="/pages-subcategory-2">Pages Subcategory 2</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
