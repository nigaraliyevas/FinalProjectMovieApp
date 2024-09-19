// src/components/CustomSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "/node_modules/swiper/swiper-bundle.min.css"; // Import Swiper styles
import { Navigation, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/showSlice";
import VideoModal from "../VideoModal/VideoModal";
import "./CustomSlider.css";
import { Link } from "react-router-dom";

const CustomSlider = () => {
  const dispatch = useDispatch();

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
      {/* Modal */}
      <VideoModal />
      {/* Modal ends */}

      {/* Slider */}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        loop={true}
        className="swiper-container"
      >
        {sliderData.map(slide => (
          <SwiperSlide key={slide.id} className="swiper-slide">
            <div className="slider-bg item min-vh-100" style={{ backgroundImage: `url(${slide.background})` }}>
              <div className="custom-container-lg container-md">
                <div className="d-flex min-vh-100 position-relative z-3">
                  <div className="col-lg-6 d-flex align-items-center col-md-6">
                    <div className="slider-info text-white position-relative">
                      <h2 className="slider-info__header text-uppercase mb-4">
                        <span className="line-vertical"></span> {slide.title}
                      </h2>
                      <ul className="slider-info__list d-flex gap-5 p-0">
                        <li className="slider-info__item slider-info__item--border text-uppercase">Tv-ma</li>
                        <li className="slider-info__item">{slide.duration}</li>
                        <li className="slider-info__item text-uppercase">
                          <a href="#" className="text-decoration-none text-white">
                            <img width={100} src={slide.imdb} alt="IMDb" className="d-inline-block" />
                            <span className="l-2">{slide.rating}</span>
                          </a>
                        </li>
                        <li className="slider-info__item text-uppercase">
                          <a href="#" className="text-decoration-none text-white">
                            {slide.year}
                          </a>
                        </li>
                        <li className="slider-info__item text-uppercase">
                          <a href="#" className="text-decoration-none text-white slider-info__item-link">
                            {slide.genre}
                          </a>
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
                            <strong>Genre</strong>
                            <span>{slide.genre}</span>
                          </li>
                          <li className="my-3">
                            <strong>Tags</strong>
                            <span>{slide.tags}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="slider-info__btn-area mt-4">
                        {/* note to myself: if it is movie has to go -->/movie , if not it is series or tv show has to go detail(in here it will open like dizilla)  */}
                        <Link to="/movie" className="btn playnow-btn text-uppercase text-decoration-none text-white">
                          Play Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center col-md-6">
                    <div className="slider-video__container position-relative">
                      <img src={slide.background} alt="Slider Video" className="slider-video" />
                      <div className="slider-video__content position-absolute top-50 start-50 translate-middle">
                        <button className="text-decoration-none text-white bg-transparent border-0" onClick={() => dispatch(openModal(slide.video))}>
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
      {/* Slider ends */}
    </section>
  );
};

export default CustomSlider;
