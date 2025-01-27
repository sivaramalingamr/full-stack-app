import { useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Edit user form submitted", id);
  };
  return (
    <div>
      <h1>Edit User</h1>
      <div className="form-container">
        <form
          name="editUserForm"
          id="editUserForm"
          onSubmit={(e) => handleEditSubmit(e)}
        >
          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
}
