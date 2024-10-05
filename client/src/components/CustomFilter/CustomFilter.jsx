import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CustomFilter.css";
const CustomFilter = () => {
  return (
    <>
      <section className="custom-filter">
        <div className="custom-filter-container">
          <div className="custom-filter-box">
            <form action="" className="custom-filter-form">
              <div className="">
                <select name="" id="">
                  <option value="" disabled selected>
                    Released Date
                  </option>
                  <option value="">s</option>
                  <option value="">m</option>
                </select>
              </div>
              <div className="">
                <select name="" id="">
                  <option value="" disabled selected>
                    Category
                  </option>
                  <option value="">s</option>
                  <option value="">m</option>
                </select>
              </div>
              <div className="">
                <select name="" id="">
                  <option value="" disabled selected>
                    Language
                  </option>
                  <option value="">s</option>
                </select>
              </div>
              <button type="submit" className="d-block w-100 custom-filter__btn">
                <FontAwesomeIcon icon={faFilter} color="#fff" className="me-2" />
                Filter
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomFilter;
