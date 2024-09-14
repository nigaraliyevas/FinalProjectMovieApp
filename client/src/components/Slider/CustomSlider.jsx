import { useState } from "react";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "/public/assets/common/base.css";
import "./CustomSlider.css";

const CustomSlider = () => {
  const [show, setShow] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const handleShow = videoUrl => {
    setCurrentVideo(videoUrl);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    // setTimeout(() => {
    //   window.dispatchEvent(new Event("resize"));
    // }, 500);
  };

  const resetVideo = () => {
    const iframe = document.getElementById("youtube-iframe");
    if (iframe) {
      const src = iframe.getAttribute("src");
      iframe.setAttribute("src", "");
      iframe.setAttribute("src", src);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <FontAwesomeIcon className="fa-chevron-left fa-xl" size="2xl" icon={faChevronRight} />,
    prevArrow: <FontAwesomeIcon className="fa-chevron-right fa-xl" size="2xl" icon={faChevronLeft} />,
    // responsive: [
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       initialSlide: 1,
    //     },
    //   },
    // ],
  };

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
      <Modal show={show} onHide={handleClose} onExited={resetVideo} centered size="lg">
        <Modal.Body className="p-0 overflow-hidden">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe id="youtube-iframe" width="100%" height="500" src={currentVideo} allow="encrypted-media" allowFullScreen title="YouTube Trailer"></iframe>
          </div>
        </Modal.Body>
      </Modal>

      {/* Slider */}
      <Slider {...settings}>
        {sliderData.map(slide => (
          <div key={slide.id} className="slider-bg item min-vh-100">
            <img className="slider-bg" src={slide.background} alt="" style={{ position: "absolute" }} />{" "}
            <div className="custom-container-lg">
              <div className="d-flex min-vh-100 position-relative z-3">
                <div className="col-lg-6 d-flex align-items-center">
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
                      <button className="btn playnow-btn text-uppercase text-decoration-none text-white" onClick={() => handleShow(slide.video)}>
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center">
                  <div className="slider-video__container position-relative">
                    <img src={slide.background} alt="Slider Video" className="slider-video" />
                    <div className="slider-video__content position-absolute top-50 start-50 translate-middle">
                      <button className="text-decoration-none text-white btn bg-transparent border-0" onClick={() => handleShow(slide.video)}>
                        <FontAwesomeIcon className="fa-solid fa-play fa-xl mb-3" icon={faPlay} />
                        <p className="font-weight-bold">Watch Trailer</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default CustomSlider;
