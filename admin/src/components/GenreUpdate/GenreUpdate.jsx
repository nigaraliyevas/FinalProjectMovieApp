import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetGenreByIdQuery, useUpdateGenreMutation } from "../../features/genres/genresApi"; 
import "./GenreUpdate.css";

const GenreUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: genre, isLoading, error } = useGetGenreByIdQuery(id);
  const [updateGenre] = useUpdateGenreMutation();
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
      alert("Genre updated successfully");
      navigate("/genres");
    } catch (err) {
      alert("Failed to update genre");
    }
  };

  if (isLoading) return <div>Loading genre data...</div>;
  if (error) return <div>Error loading genre data</div>;

  return (
    <div className="country-update-container">
      <h2 className="country-update-title">Update Country</h2>
      <form className="country-update-form" onSubmit={handleUpdate}>
        <label htmlFor="name">Genre Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success">
          Update Genre
        </button>
      </form>
    </div>
  );
};

export default GenreUpdate;
