import "/node_modules/swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons"; // For regular icons

import "bootstrap/dist/css/bootstrap.min.css";

import "./MoviesSlider.css";
import { Link } from "react-router-dom";

const MoviesSlider = () => {
  const allTimeHits = [
    {
      id: 1,
      imgSrc: "./assets/img/all-time-hits/img1.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
    {
      id: 2,
      imgSrc: "./assets/img/all-time-hits/img2.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
    {
      id: 3,
      imgSrc: "./assets/img/all-time-hits/img3.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
    {
      id: 4,
      imgSrc: "./assets/img/all-time-hits/img4.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
    {
      id: 5,
      imgSrc: "./assets/img/all-time-hits/img5.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
    {
      id: 6,
      imgSrc: "./assets/img/all-time-hits/img6.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
    {
      id: 7,
      imgSrc: "./assets/img/all-time-hits/img7.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
    {
      id: 8,
      imgSrc: "./assets/img/all-time-hits/img8.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
    {
      id: 9,
      imgSrc: "./assets/img/all-time-hits/img9.jpg",
      title: "Skull Of Myths",
      duration: "1hr 24mins",
      genre: "Action",
    },
  ];

  return (
    <section className="all-time">
      <div className="custom-container-lg">
        <div className="all-time__content">
          <div className="all-time__slider-area">
            <div className="d-flex align-items-center justify-content-between area mb-2">
              <h4 className="all-time__slider-header">Free Shows</h4>
              <a href="" className="btn">
                Watch More
              </a>
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
              {allTimeHits.map(item => (
                <SwiperSlide key={item.id} className="item all-time__slider-item">
                  <Link to="">
                    <div className="all-time-container__img">
                      <img className="position-relative" width="400px" src={item.imgSrc} alt="" />
                    </div>
                    <div className="all-time__slider-item-icon position-absolute z-3">
                      <FontAwesomeIcon icon={faHeart} style={{ color: "#ffffff" }} size="lg" />
                    </div>
                    <div className="movie-infos">
                      <h4 className="movie-infos__name mt-2">{item.title}</h4>
                      <span className="movie-infos__duration">{item.duration}</span>
                      <span className="movie-infos__genre">
                        <Link to={"/action"}>
                          <FontAwesomeIcon icon={faCircle} />
                          {item.genre}
                        </Link>
                      </span>
                    </div>
                  </Link>
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
