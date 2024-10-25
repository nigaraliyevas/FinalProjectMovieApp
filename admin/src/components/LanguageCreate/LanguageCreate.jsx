import { useState } from "react";
import { useCreateLanguageMutation } from "../../features/languages/languageApi";
import "./LanguageCreate.css";

const LanguageCreate = () => {
  const [name, setName] = useState("");
  const [createCountry, { isLoading, isSuccess, error }] = useCreateLanguageMutation();

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await createCountry({ name }).unwrap();
      alert("Language created successfully!");
      setName("");
    } catch (err) {
      alert("Failed to create language.");
    }
  };

  return (
    <div className="country-create-container">
      <h2 className="country-create-title">Create New Language</h2>
      <form className="country-create-form" onSubmit={handleCreate}>
        <label htmlFor="name">Language Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Language"}
        </button>
        {isSuccess && <p className="success-msg">Language added successfully!</p>}
        {error && <p className="error-msg">Error creating language.</p>}
      </form>
    </div>
  );
};

export default LanguageCreate;
