import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="footer-custom">
      <div className="custom-container-lg">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12 footer-brand">
            <div className="footer-logo d-flex align-items-center mb-3">
              <FontAwesomeIcon className="navbar-items__logo-icon" icon={faPlay} />
              <h2 className="navbar-items__logo-name mb-0">
                <Link to="/" className="text-white text-decoration-none">
                  CineSmart
                </Link>
              </h2>
            </div>
            <p className="footer-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="footer-social-icons">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="mailto:example@gmail.com" aria-label="Email">
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12 footer-links">
            <h5 className="footer-title">Explore</h5>
            <ul className="footer-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Movie">Movies</Link>
              </li>
              <li>
                <Link to="/free-movies">Free Movies</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12 footer-links">
            <h5 className="footer-title">Company</h5>
            <ul className="footer-list">
              <li>
                <Link to="#">Terms Of Use</Link>
              </li>
              <li>
                <Link to="#">Contact Us</Link>
              </li>
              <li>
                <Link to="/pricing-plan">Subscribe</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 footer-download mt-0">
            <h5 className="footer-title">Download App</h5>
            <p className="footer-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className="footer-app-links">
              <a href="#">
                <img src="/assets/img/footer/icons/googleplaystore.png" alt="Google Play" />
              </a>
              <a href="#">
                <img src="/assets/img/footer/icons/appstore.png" alt="App Store" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
