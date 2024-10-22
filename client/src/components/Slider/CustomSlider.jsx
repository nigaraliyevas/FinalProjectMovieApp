import { useListMoviesQuery } from "../../features/movies/moviesApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/showSlice";
import VideoModal from "../VideoModal/VideoModal";
import { Link } from "react-router-dom";
import "./CustomSlider.css";

const CustomSlider = () => {
  const dispatch = useDispatch();
  // Fetch first 3 movies using RTK Query
  const { data: movies, isLoading, error } = useListMoviesQuery({ page: 1, pageSize: 3 });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading movies!</p>;
  }
  return (
    <section className="slider">
      {/* Modal */}
      <VideoModal />

      {/* Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 3000 }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        loop={true}
        className="swiper-container"
      >
        {movies.items.map(slide => (
          <SwiperSlide key={slide.id} className="swiper-slide">
            <div className="slider-bg item min-vh-100" style={{ backgroundImage: `url(${slide.thumbBgImgURL})` }}>
              <div className="custom-container-lg container-md">
                <div className="d-flex min-vh-100 position-relative z-3">
                  <div className="col-lg-6 d-flex align-items-center col-md-6">
                    <div className="slider-info text-white position-relative">
                      <h2 className="slider-info__header text-uppercase mb-4">
                        <span className="line-vertical"></span> {slide.name}
                      </h2>
                      <ul className="slider-info__list d-flex gap-5 p-0">
                        <li className="slider-info__item slider-info__item--border text-uppercase">Tv-ma</li>
                        <li className="slider-info__item">{slide.duration}</li>
                        <li className="slider-info__item text-uppercase">
                          <a href="#" className="text-decoration-none text-white">
                            <img width={100} src="/public/assets/img/slider/imdb.png" alt="IMDb" className="d-inline-block" />
                            <span className="l-3">{slide.imdbRate}</span>
                          </a>
                        </li>
                        <li className="slider-info__item text-uppercase">
                          <a href="#" className="text-decoration-none text-white">
                            {new Date(slide.releasedDate).getFullYear()}
                          </a>
                        </li>
                        <li className="slider-info__item text-uppercase">
                          <a href="#" className="text-decoration-none text-white slider-info__item-link">
                            <span>{slide.genres[0].name}</span>
                          </a>
                        </li>
                      </ul>
                      <div className="slider-info__desc">
                        <p className="mb-2">{slide.summary}</p>
                      </div>
                      <div className="slider-info__about mt-2">
                        <ul className="slider-info__about-list list-unstyled">
                          <li className="my-3">
                            <strong>Cast: </strong>
                            {slide.actors.map((actor, index) => (
                              <span key={actor.id}>
                                {actor.name}
                                {index < slide.actors.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </li>
                          <li className="my-3">
                            <strong>Genre: </strong>
                            {slide.genres.map((genre, index) => (
                              <span key={genre.id}>
                                {genre.name}
                                {index < slide.genres.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </li>
                          <li className="my-3">
                            <strong>Tags: </strong>
                            {slide.tags.map((tag, index) => (
                              <span key={tag.id}>
                                {tag.name}
                                {index < slide.tags.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </li>
                        </ul>
                      </div>
                      <div className="slider-info__btn-area mt-4">
                        <Link to={`Movie/${slide.id}`} className="btn playnow-btn text-uppercase text-decoration-none text-white">
                          Play Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center col-md-6">
                    <div className="slider-video__container position-relative">
                      <img src={slide.thumbImgURL} alt="Slider Video" className="slider-video" width={600} height={600} />
                      <div className="slider-video__content position-absolute top-50 start-50 translate-middle">
                        <button className="text-decoration-none text-white bg-transparent border-0" onClick={() => dispatch(openModal(slide.movieTrailerURL))}>
                          <FontAwesomeIcon size="2xl" className="fa-solid fa-play fa-xl mb-3 play-button" icon={faCirclePlay} />
                          <p className="font-weight-bold">Watch Trailer</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev">
          <FontAwesomeIcon className="fa-chevron-left fa-xl" size="2xl" icon={faChevronLeft} />
        </div>
        <div className="swiper-button-next">
          <FontAwesomeIcon className="fa-chevron-right fa-xl" size="2xl" icon={faChevronRight} />
        </div>
      </Swiper>
    </section>
  );
};

export default CustomSlider;
