import { faChevronRight, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./BreadCrumb.css";
const BreadCrumb = ({ location }) => {
  return (
    <>
      <section className="breadcrumb" style={{ backgroundImage: `url("/public/assets/img/movies/breadcrumb/breadcrumb.jpg")` }}>
        <div className="breadcrumb-container w-100 text-center">
          <div className="breadcrumb-row  position-relative">
            <div className="breadcrumb-top">
              <h2 className="breadcrumb-top__title">{location}</h2>
            </div>
            <div className="breadcrumb-bottom">
              <ul className="breadcrumb-bottom__list list-unstyled">
                <li className="breadcrumb-bottom__item">
                  <Link to="/">
                    <FontAwesomeIcon icon={faHouse} size="xl" color="#fff" className=" me-2" />
                    <span style={{ color: "#fff" }}>Home</span>
                  </Link>
                </li>
                <li className="breadcrumb-bottom__item">
                  <Link to="#">
                    <FontAwesomeIcon icon={faChevronRight} size="xs" color="#6c757d" className=" mx-3" />
                    <span className="breadcrumb-bottom__item--blue">{location}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BreadCrumb;
