import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "/node_modules/swiper/swiper-bundle.min.css";
import "/node_modules/swiper/swiper.min.css";
import "./MovieSwiper.css";
const MovieSwiper = () => {
  const sliderData = [
    {
      id: 1,
      background: "./public/assets/img/slider/slider1.jpg",
      title: "Thrive the Bank",
      rating: 9.5,
      year: 2018,
      genre: "Action",
      duration: "30min",
      cast: "Miley Cyrus, Dwayne Johnson",
      tags: "brother, childhood, old",
      description: "Streamlab is a long established fact that a reader will be distracted by the readable content of a page...",
      imdb: "./public/assets/img/slider/imdb.png",
      video: "https://www.youtube.com/embed/videoseries?list=PLsyvDWwjkTqtOmqAiTzzfHspTAztB-udL",
    },
    {
      id: 2,
      background: "./public/assets/img/slider/slider2.jpg",
      title: "Another Movie",
      rating: 8.5,
      year: 2020,
      genre: "Drama",
      duration: "45min",
      cast: "Actor One, Actor Two",
      tags: "drama, intense",
      description: "This is another movie description...",
      imdb: "./public/assets/img/slider/imdb.png",
      video: "https://www.youtube.com/embed/videoseries?list=PLsyvDWwjkTqtOmqAiTzzfHspTAztB-udL",
    },
    {
      id: 3,
      background: "./public/assets/img/slider/slider3.jpg",
      title: "Yet Another Movie",
      rating: 7.5,
      year: 2022,
      genre: "Comedy",
      duration: "1h 30min",
      cast: "Comedian A, Comedian B",
      tags: "funny, comedy",
      description: "This is yet another movie description...",
      imdb: "./public/assets/img/slider/imdb.png",
      video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
  ];

  return (
    <section className="slider">
      <div className="custom-container-lg">
        {/* Swiper Slider */}
        <div className="slider__linked">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {sliderData.map(slide => (
              <SwiperSlide key={slide.id}>
                <div
                  className="item"
                  style={{
                    backgroundImage: `url(${slide.background})`,
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
                            {slide.title}
                          </h2>
                          <ul className="slider-info__list d-flex gap-5 p-0">
                            <li className="slider-info__item slider-info__item--border text-uppercase">{slide.genre}</li>
                            <li className="slider-info__item">{slide.duration}</li>
                            <li className="slider-info__item text-uppercase">
                              <Link to="#" className="text-decoration-none text-white">
                                <img src={slide.imdb} alt="IMDb" className="d-inline-block" />
                                <span className="l-2">{slide.rating}</span>
                              </Link>
                            </li>
                            <li className="slider-info__item text-uppercase">
                              <Link to="#" className="text-decoration-none text-white">
                                {slide.year}
                              </Link>
                            </li>
                          </ul>
                          <div className="slider-info__desc">
                            <p className="mb-2">{slide.description}</p>
                          </div>
                          <div className="slider-info__about mt-2">
                            <ul className="slider-info__about-list list-unstyled">
                              <li className="my-3">
                                <strong>Cast</strong>
                                <span>{slide.cast}</span>
                              </li>
                              <li className="my-3">
                                <strong>Tags</strong>
                                <span>{slide.tags}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="slider-info__btn-area mt-4">
                            <Link to="/" className="btn playnow-btn text-uppercase text-decoration-none text-white">
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
