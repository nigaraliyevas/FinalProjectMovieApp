import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCountryByIdQuery, useUpdateCountryMutation } from "../../features/countries/countriesApi"; // Assuming this is the correct path
import "./CountryUpdate.css";

const CountryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: country, isLoading, error } = useGetCountryByIdQuery(id);
  const [updateCountry] = useUpdateCountryMutation();
  const [name, setName] = useState("");

  // Once the country data is loaded, set the form input field
  React.useEffect(() => {
    if (country) {
      setName(country.name);
    }
  }, [country]);

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await updateCountry({ id, name }).unwrap();
      alert("Country updated successfully");
      navigate("/countries"); // Redirect after successful update
    } catch (err) {
      alert("Failed to update country");
    }
  };

  if (isLoading) return <div>Loading country data...</div>;
  if (error) return <div>Error loading country data</div>;

  return (
    <div className="country-update-container">
      <h2 className="country-update-title">Update Country</h2>
      <form className="country-update-form" onSubmit={handleUpdate}>
        <label htmlFor="name">Country Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success">
          Update Country
        </button>
      </form>
    </div>
  );
};

export default CountryUpdate;
