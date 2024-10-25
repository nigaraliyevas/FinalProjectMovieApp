import { useState } from "react";
import { useCreateTagMutation } from "../../features/tags/tagsApi";
import "./TagCreate.css";

const GenreCreate = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // State for storing the error message
  const [createCountry, { isLoading, isSuccess, error }] = useCreateTagMutation();

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await createCountry({ name }).unwrap();
      alert("Tag created successfully!");
      setName("");
    } catch (err) {
      alert("Failed to create tag.");
      if (err?.data?.message) {
        setErrorMessage(err.data.message); // Set the error message from the response
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="country-create-container">
      <h2 className="country-create-title">Create New Tag</h2>
      <form className="country-create-form" onSubmit={handleCreate}>
        <label htmlFor="name">Tag Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Tag"}
        </button>
        {isSuccess && <p className="success-msg">Tag added successfully!</p>}
        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}{" "}
      </form>
    </div>
  );
};

export default GenreCreate;
