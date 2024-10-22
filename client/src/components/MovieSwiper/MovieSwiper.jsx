import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "/node_modules/swiper/swiper-bundle.min.css";
import "/node_modules/swiper/swiper.min.css";
import "./MovieSwiper.css";
import { useListMoviesQuery } from "../../features/movies/moviesApi";
const MovieSwiper = () => {
  const { data: movies, isLoading, error } = useListMoviesQuery({ page: 1, pageSize: 6 });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading movies!</p>;
  }
  return (
    <section className="slider">
      <div className="custom-container-lg">
        {/* Swiper Slider */}
        <div className="slider__linked">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {movies.items.slice(3, 6).map(slide => (
              <SwiperSlide key={slide.id}>
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${slide.thumbBgImgURL})`,
                    backgroundSize: "cover",
                    height: "600px",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="custom-container-lg">
                    <div className="d-flex">
                      <div className="col-lg-6 d-flex align-items-center p-5">
                        <div className="slider-info text-white position-relative">
                          <h2
                            className="slider-info__header text-uppercase mb-4"
                            style={{
                              marginTop: "50px",
                            }}
                          >
                            <span className="line-vertical"></span>
                            {slide.name}
                          </h2>
                          <ul className="slider-info__list d-flex gap-5 p-0">
                            <li className="slider-info__item slider-info__item--border text-uppercase">TV-MA</li>
                            <li className="slider-info__item">{slide.duration}</li>
                            <li className="slider-info__item text-uppercase">
                              <Link to="#" className="text-decoration-none text-white">
                                <img src="/public/assets/img/slider/imdb.png" alt="IMDb" className="d-inline-block" />
                                <span className="l-2">{slide.imdbRate}</span>
                              </Link>
                            </li>
                            <li className="slider-info__item text-uppercase">
                              <Link to="#" className="text-decoration-none text-white">
                                {new Date(slide.releasedDate).getFullYear()}
                              </Link>
                            </li>
                          </ul>
                          <div className="slider-info__desc">
                            <p className="mb-2">{slide.summary}</p>
                          </div>
                          <div className="slider-info__about mt-2">
                            <ul className="slider-info__about-list list-unstyled">
                              <li className="my-3">
                                <strong>Cast</strong>
                                {slide.actors.map((actor, index) => (
                                  <span key={actor.id}>
                                    {actor.name}
                                    {index < slide.actors.length - 1 ? ", " : ""}
                                  </span>
                                ))}
                              </li>
                              <li className="my-3">
                                <strong>Tags</strong>
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
                              Play now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default MovieSwiper;
