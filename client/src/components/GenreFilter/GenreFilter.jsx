import "./GenreFiter.css";
import GenreList from "../../features/genres/genreList";
const GenreFilter = () => {
  return (
    <>
      <section className="genres">
        <div className="genres-container">
          <div className="genres-box">
            <h2 className="genres-box__header">Filter By Genre</h2>
            <ul className="genres-box__list list-unstyled">
              <GenreList />
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default GenreFilter;
