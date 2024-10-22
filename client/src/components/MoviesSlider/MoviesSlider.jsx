import "/node_modules/swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";

import "./MoviesSlider.css";
import MovieCard from "../MovieCard/MovieCard";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useListMoviesQuery, useFreeMoviesQuery } from "../../features/movies/moviesApi";
import { useState } from "react";
import { Link } from "react-router-dom";

const MoviesSlider = ({ isFree, init, end }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: moviesData, error: moviesError, isLoading: moviesLoading } = useListMoviesQuery({ page: currentPage, pageSize: 24 });
  const { data: freeMoviesData, error: freeMoviesError, isLoading: freeMoviesLoading } = useFreeMoviesQuery({ page: currentPage, pageSize: 24 });
  if (moviesLoading || freeMoviesLoading) {
    return <p>Loading movies...</p>;
  }
  let displayedMovies;
  if (moviesError || freeMoviesError) {
    return <p>Error loading movies.</p>;
  }
  if (isFree) {
    displayedMovies = freeMoviesData.items;
  } else {
    displayedMovies = moviesData.items;
  }
  return (
    <section className="all-time">
      <div className="custom-container-lg">
        <div className="all-time__content">
          <div className="all-time__slider-area">
            <div className="d-flex align-items-center justify-content-between area mb-2">
              <h4 className="all-time__slider-header">Free Movies</h4>
              <Link to="/free-movies" className="btn">
                Watch More
              </Link>
            </div>
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={4}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              className="owl-carousel owl-theme"
            >
              {displayedMovies.slice(init, end).map(item => (
                <SwiperSlide key={item.id} className="item all-time__slider-item">
                  {/* note to myself: if it is movie has to go -->/movie , if not it is series or tv show has to go detail(in here it will open like dizilla)  */}
                  <MovieCard id={item.id} title={item.name} duration={item.duration} genre={item.genres} location={"/Movie"} imgSrc={item.thumbImgURL} height={"580px"} />
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev">
                <FontAwesomeIcon className="fa-chevron-left fa-xl" size="2xl" icon={faChevronLeft} />
              </div>
              <div className="swiper-button-next">
                <FontAwesomeIcon className="fa-chevron-right fa-xl" size="2xl" icon={faChevronRight} />
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoviesSlider;
