import { useState } from "react";
import { useCreateActorMutation } from "../../features/actors/actorsApi";
import "./ActorCreate.css";

const ActorCreate = () => {
  const [fullName, setName] = useState("");
  const [createCountry, { isLoading, isSuccess, error }] = useCreateActorMutation();

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await createCountry({ fullName }).unwrap();
      alert("Actor created successfully!");
      setName("");
    } catch (err) {
      alert("Failed to create actor.");
    }
  };

  return (
    <div className="country-create-container">
      <h2 className="country-create-title">Create New Actor</h2>
      <form className="country-create-form" onSubmit={handleCreate}>
        <label htmlFor="name">Actor Name</label>
        <input type="text" id="fullName" value={fullName} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Actor"}
        </button>
        {isSuccess && <p className="success-msg">Actor added successfully!</p>}
        {error && <p className="error-msg">Error creating actor.</p>}
      </form>
    </div>
  );
};

export default ActorCreate;
