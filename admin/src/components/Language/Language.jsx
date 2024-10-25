import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLanguagesQuery, useDeleteLanguageMutation } from "../../features/languages/languageApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Actor = () => {
  const navigate = useNavigate();
  const { data: genres, isLoading, error } = useGetLanguagesQuery();
  const [deleteGenre] = useDeleteLanguageMutation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this language?")) {
      try {
        setLoading(true);
        await deleteGenre(id).unwrap();
        alert("Language deleted successfully");
      } catch (err) {
        alert("Failed to delete the language");
      } finally {
        setLoading(false);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading languages</div>;

  return (
    <section className="countries-list">
      <div className="container">
        <h2>Languages</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {genres.map(genre => (
              <tr key={genre.id}>
                <td>{genre.name}</td>
                <td>
                  {/* <button onClick={() => navigate(`/countries/${country.id}`)} className="btn btn-info">
                  View Details
                </button> */}
                  <button onClick={() => navigate(`/languages/update/${genre.id}`)} className="btn btn-light">
                    <FontAwesomeIcon icon={faEdit} color="green" title="Edit" size="xl" />
                  </button>
                  <button onClick={() => handleDelete(genre.id)} className="btn btn-light" disabled={loading}>
                    <FontAwesomeIcon icon={faTrashAlt} color="red" title="Delete" size="xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Actor;
