import React, { useState } from "react";
import { useCreateCountryMutation } from "../../features/countries/countriesApi";
import "./CountryCreate.css";

const CountryCreate = () => {
  const [name, setName] = useState("");
  const [createCountry, { isLoading, isSuccess, error }] = useCreateCountryMutation();

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await createCountry({ name }).unwrap();
      alert("Country created successfully!");
      setName("");
    } catch (err) {
      alert("Failed to create country.");
    }
  };

  return (
    <div className="country-create-container">
      <h2 className="country-create-title">Create New Country</h2>
      <form className="country-create-form" onSubmit={handleCreate}>
        <label htmlFor="name">Country Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Country"}
        </button>
        {isSuccess && <p className="success-msg">Country added successfully!</p>}
        {error && <p className="error-msg">Error creating country.</p>}
      </form>
    </div>
  );
};

export default CountryCreate;
