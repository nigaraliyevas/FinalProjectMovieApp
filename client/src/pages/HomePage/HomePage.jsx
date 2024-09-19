// import Header from "../../components/Header/Header"
import Slider from "../../components/Slider/CustomSlider";
import MoviesSlider from "../../components/MoviesSlider/MoviesSlider";
import MovieSwiper from "../../components/MovieSwiper/MovieSwiper";
import "/public/assets/common/base.css";
const HomePage = () => {
  return (
    <>
      <Slider />
      <MoviesSlider />
      <MoviesSlider />
      <MovieSwiper />
      <MoviesSlider />
    </>
  );
};

export default HomePage;
