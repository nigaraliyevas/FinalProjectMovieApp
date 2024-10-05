import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.css";

const Search = () => {
  return (
    <>
      <section className="search">
        <div className="search-container">
          <div className="search-box">
            <form className="search-form">
              <input type="text" className="search-form__input" placeholder="Search..." />
              <button type="submit" className="search-form__submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} color="#fff" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
