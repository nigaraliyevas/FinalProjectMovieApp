import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetTagByIdQuery, useUpdateTagMutation } from "../../features/tags/tagsApi";
import "./TagUpdate.css";

const GenreUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: genre, isLoading, error } = useGetTagByIdQuery(id);
  const [updateGenre] = useUpdateTagMutation();
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
      alert("Tag updated successfully");
      navigate("/tags");
    } catch (err) {
      alert("Failed to update genre");
    }
  };

  if (isLoading) return <div>Loading genre data...</div>;
  if (error) return <div>Error loading genre data</div>;

  return (
    <div className="country-update-container">
      <h2 className="country-update-title">Update Tag</h2>
      <form className="country-update-form" onSubmit={handleUpdate}>
        <label htmlFor="name">Tag Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success">
          Tag Genre
        </button>
      </form>
    </div>
  );
};

export default GenreUpdate;
