import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetLanguageByIdQuery, useUpdateLanguageMutation } from "../../features/languages/languageApi";
import "./LanguageUpdate.css";

const LanguageUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: genre, isLoading, error } = useGetLanguageByIdQuery(id);
  const [updateGenre] = useUpdateLanguageMutation();
  const [name, setName] = useState("");

  React.useEffect(() => {
    if (genre) {
      setName(genre.name);
    }
  }, [genre]);

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await updateGenre({ id, name }).unwrap();
      alert("Language updated successfully");
      navigate("/languages");
    } catch (err) {
      alert("Failed to update language");
    }
  };

  if (isLoading) return <div>Loading language data...</div>;
  if (error) return <div>Error loading language data</div>;

  return (
    <div className="country-update-container">
      <h2 className="country-update-title">Update Language</h2>
      <form className="country-update-form" onSubmit={handleUpdate}>
        <label htmlFor="name">language Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success">
          Update Language
        </button>
      </form>
    </div>
  );
};

export default LanguageUpdate;
