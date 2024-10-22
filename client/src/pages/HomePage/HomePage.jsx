// import Header from "../../components/Header/Header"
import Slider from "../../components/Slider/CustomSlider";
import MoviesSlider from "../../components/MoviesSlider/MoviesSlider";
import MovieSwiper from "../../components/MovieSwiper/MovieSwiper";
import "/public/assets/common/base.css";
const HomePage = () => {
  return (
    <>
      <Slider />
      <MoviesSlider isFree={true} init={0} end={8} />
      <MoviesSlider isFree={true} init={8} end={16}/>
      <MovieSwiper />
      <MoviesSlider isFree={true} init={16} end={24}/>
    </>
  );
};

export default HomePage;
