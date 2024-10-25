import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetTagsQuery, useDeleteTagMutation } from "../../features/tags/tagsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Tag = () => {
  const navigate = useNavigate();
  const { data: tags, isLoading, error } = useGetTagsQuery();
  const [deleteTag] = useDeleteTagMutation();
  const [loading, setLoading] = useState(false);

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      try {
        setLoading(true);
        await deleteTag(id).unwrap();
        alert("Tag deleted successfully");
      } catch (err) {
        alert("Failed to delete the tag");
      } finally {
        setLoading(false);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tags</div>;

  return (
    <section className="countries-list">
      <div className="container">
        <h2>Tags</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(tag => (
              <tr key={tag.id}>
                <td>{tag.name}</td>
                <td>
                  {/* <button onClick={() => navigate(`/countries/${country.id}`)} className="btn btn-info">
                  View Details
                </button> */}
                  <button onClick={() => navigate(`/tags/update/${tag.id}`)} className="btn btn-light">
                    <FontAwesomeIcon icon={faEdit} color="green" title="Edit" size="xl" />
                  </button>
                  <button onClick={() => handleDelete(tag.id)} className="btn btn-light" disabled={loading}>
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

export default Tag;
