import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetActorByIdQuery, useUpdateActorMutation } from "../../features/actors/actorsApi";
import "./ActorUpdate.css";

const ActorUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: genre, isLoading, error } = useGetActorByIdQuery(id);
  const [updateGenre] = useUpdateActorMutation();
  const [fullName, setName] = useState("");

  React.useEffect(() => {
    if (genre) {
      setName(genre.fullName);
    }
  }, [genre]);

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await updateGenre({ id, fullName }).unwrap();
      alert("actor updated successfully");
      navigate("/actors");
    } catch (err) {
      alert("Failed to update actor");
    }
  };

  if (isLoading) return <div>Loading actor data...</div>;
  if (error) return <div>Error loading actor data</div>;

  return (
    <div className="country-update-container">
      <h2 className="country-update-title">Update Actor</h2>
      <form className="country-update-form" onSubmit={handleUpdate}>
        <label htmlFor="name">Actor Name</label>
        <input type="text" id="fullName" value={fullName} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success">
          Update Actor
        </button>
      </form>
    </div>
  );
};

export default ActorUpdate;
