import { Link } from "react-router-dom";
import "./FilterByYear.css"; // Assuming you're using SCSS for styles

const date = new Date();
const startDate = 1934; // You can adjust this
const endDate = date.getFullYear();

const FilterByYear = () => {
  const yearElements = [];
  for (let i = endDate; i >= startDate; i--) {
    yearElements.push(
      <Link to={`/${i}`} className="year-item" key={i}>
        <div>{i}</div>
      </Link>
    );
  }

  return (
    <section className="years">
      <div className="filter-by-year-container">
        <h2 className="filter-by-year-container__header">Filter By Year</h2>
        <div className="years-box">
          <div className="year-grid">{yearElements}</div>
        </div>
      </div>
    </section>
  );
};

export default FilterByYear;
