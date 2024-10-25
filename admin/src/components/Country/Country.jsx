import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCountriesQuery, useDeleteCountryMutation } from "../../features/countries/countriesApi"; // Assuming this is the correct path
import "./Country.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const Countries = () => {
  const navigate = useNavigate();
  const { data: countries, isLoading, error } = useGetCountriesQuery();
  const [deleteCountry] = useDeleteCountryMutation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      try {
        setLoading(true);
        await deleteCountry(id).unwrap();
        alert("Country deleted successfully");
      } catch (err) {
        alert("Failed to delete the country");
      } finally {
        setLoading(false);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading countries</div>;

  return (
    <section className="countries-list">
      <div className="container">
        <h2>Countries</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map(country => (
              <tr key={country.id}>
                <td>{country.name}</td>
                <td>
                  {/* <button onClick={() => navigate(`/countries/${country.id}`)} className="btn btn-info">
                    View Details
                  </button> */}
                  <button onClick={() => navigate(`/countries/update/${country.id}`)} className="btn btn-light">
                    <FontAwesomeIcon icon={faEdit} color="green" title="Edit" size="xl" />
                  </button>
                  <button onClick={() => handleDelete(country.id)} className="btn btn-light" disabled={loading}>
                    <FontAwesomeIcon icon={faTrashAlt} color="red" title="Delete" size="xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Countries;
