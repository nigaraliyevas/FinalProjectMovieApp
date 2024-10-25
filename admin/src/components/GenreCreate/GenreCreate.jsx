import { useState } from "react";
import { useCreateGenreMutation } from "../../features/genres/genresApi";
import "./GenreCreate.css";

const GenreCreate = () => {
  const [name, setName] = useState("");
  const [createCountry, { isLoading, isSuccess, error }] = useCreateGenreMutation();

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await createCountry({ name }).unwrap();
      alert("Genre created successfully!");
      setName("");
    } catch (err) {
      alert("Failed to create genre.");
    }
  };

  return (
    <div className="country-create-container">
      <h2 className="country-create-title">Create New Genre</h2>
      <form className="country-create-form" onSubmit={handleCreate}>
        <label htmlFor="name">Genre Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Genre"}
        </button>
        {isSuccess && <p className="success-msg">Genre added successfully!</p>}
        {error && <p className="error-msg">Error creating genre.</p>}
      </form>
    </div>
  );
};

export default GenreCreate;
