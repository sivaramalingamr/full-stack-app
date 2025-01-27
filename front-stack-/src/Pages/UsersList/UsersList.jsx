import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "../../Components/Table";
import { useNavigate } from "react-router-dom";
import Form from "../../Components/Form";

export default function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editUser, setEditUser] = useState({});

  const editHandleChange = (event) => {
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value,
    });
  };
  const formElements = [
    {
      label: "Username",
      type: "text",
      id: "username",
      name: "username",
      required: false,
      onChange: editHandleChange,
      value: editUser.username,
    },
    {
      label: "First Name",
      type: "text",
      id: "first_name",
      name: "first_name",
      required: false,
      onChange: editHandleChange,
      value: editUser.first_name,
    },
    {
      label: "Last Name",
      type: "text",
      id: "last_name",
      name: "last_name",
      required: false,
      onChange: editHandleChange,
      value: editUser.last_name,
    },
    {
      label: "Email",
      type: "text",
      id: "email",
      name: "email",
      required: false,
      onChange: editHandleChange,
      value: editUser.email,
    },
    {
      label: "Phone",
      type: "text",
      id: "phone",
      name: "phone",
      required: false,
      onChange: editHandleChange,
      value: editUser.phone,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      required: false,
      onChange: editHandleChange,
      value: editUser.password,
    },
    {
      label: "Address 1",
      type: "text",
      id: "address1",
      name: "address1",
      required: false,
      onChange: editHandleChange,
      value: editUser.address1,
    },
    {
      label: "Address 2",
      type: "text",
      id: "address2",
      name: "address2",
      required: false,
      onChange: editHandleChange,
      value: editUser.address2,
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/users/list",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = response.data;
          setUsers(data);
          setLoading(false);
        } else {
          setLoading(false);
          setErrors(true);
        }
      } catch (error) {
        setLoading(false);
        setErrors(true);
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  const editHandler = async (event, index) => {
    const editForm = users[index];
    setEditUser(editForm);
    setIsEdit(true);
  };
  const editFormHandler = async (event) => {
    const getEditRowId = editUser.id;
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/users/edit/${getEditRowId}`,
        editUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEdit(false);
        alert(response.data.msg);
        const updatedUsers = users.map((user) =>
          user.id === getEditRowId ? { ...editUser } : user
        );
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
      alert("Error while editing user");
      setIsEdit(false);
    }
  };
  const deleteHandler = async (event, index) => {
    const getDeleteRowId = users[index].id;
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/auth/users/delete/${getDeleteRowId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert(response.data.msg);
        const updatedUsers = users.map((user) => ({
          ...user,
          is_deleted: user.id === getDeleteRowId ? true : user.is_deleted,
        }));
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
      alert("Error while deleting user");
    }
  };
  const handleEditCancel = (event) => {
    event.preventDefault();
    setIsEdit(false);
  };

  return (
    <>
      {!isEdit ? (
        <div>
          <h1>Users List</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            (users.length === 0 && <p>No users found</p>) || (
              <Table
                tableData={users}
                onEdit={editHandler}
                onDelete={deleteHandler}
              />
            )
          )}
        </div>
      ) : (
        <div>
          <h1>Edit User</h1>
          <div className="form-container">
            <form
              name="editUserForm"
              id="editUserForm"
              onSubmit={(e) => editFormHandler(e)}
            >
              <Form formElements={formElements} />
              <button type="submit">Edit</button>
              <button type="button" onClick={(e) => handleEditCancel(e)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
