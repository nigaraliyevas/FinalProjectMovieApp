import { Link, useNavigate } from "react-router-dom";
import { faPlay, faChevronDown, faMagnifyingGlass, faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "/node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();
  // const [openDropdown, setOpenDropdown] = useState(null);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
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
  // const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // const toggleSearch = () => {
  //   setIsSearchOpen(!isSearchOpen);
  // };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUsername(null);
    navigate("/");
  };
  const extractUsernameFromToken = token => {
    try {
      const decoded = jwtDecode(token);
      return decoded.username || decoded.unique_name || decoded.id || decoded.userImage;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };
  const extractUserImgFromToken = token => {
    try {
      const decoded = jwtDecode(token);
      return decoded.userImage;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      const extractedUsername = extractUsernameFromToken(token);
      const extractedUserImg = extractUserImgFromToken(token);
      if (extractedUsername || extractedUserImg) {
        setUsername(extractedUsername);
        setUserImage(extractedUserImg);
      }
    }
  }, []);

  // const toggleDropdown = index => {
  //   setOpenDropdown(openDropdown === index ? null : index);
  // };
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
                    <Link style={{ fontSize: "22px" }} to="/Movie">
                      Movies
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
                {/* <li style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center" }}>
                  <FontAwesomeIcon icon={isSearchOpen ? faTimes : faMagnifyingGlass} className="search-icon" onClick={toggleSearch} style={{ cursor: "pointer", color: "#fff" }} />
                  {isSearchOpen && (
                    <div className="search-bar">
                      <input type="text" placeholder="Search .." className="search-input" />
                      <button className="search-btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </div>
                  )}
                </li> */}

                {username ? (
                  <>
                    <li className="d-flex align-items-center gap-2">
                      {userImage ? <img width={75} height={75} src={userImage} alt="" style={{ borderRadius: "50%" }} /> : <FontAwesomeIcon className="user-icon" icon={faUser} style={{ color: "#ffffff" }} />}
                      <span className="username text-white">{username}</span>
                    </li>
                    <li className="subscribe-bg p-0">
                      <button onClick={handleLogout} className="text-uppercase text-decoration-none subscribe-bg login-btn ">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="subscribe-bg">
                      <Link to="/login" className="text-uppercase text-decoration-none">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/pricing-plan" className="text-uppercase text-decoration-none subscribe-bg">
                        Subscribe
                      </Link>
                    </li>
                  </>
                )}

                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="burger-menu-icon" onClick={toggleMenu} />
              </ul>
            </div>
          </nav>
          <div className={`burger-menu ${isMenuOpen ? "open" : ""}`}>
            <ul className="burger-menu-list list-unstyled">
              <li className={isMenuOpen ? "open" : ""}>
                <Link to="/">Home</Link>
              </li>

              <li className={isMenuOpen ? "open" : ""}>
                <Link to="/Movie">Movies</Link>
              </li>

              <li className={isMenuOpen ? "open" : ""}>
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
