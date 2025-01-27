import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../Components/Form";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    username: "",
    first_name: "",
    last_name: "",
    address1: "",
    address2: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (event) => {
    // handle change logic here
    setFormValue({
      ...formValue,
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
      onChange: handleChange,
      value: formValue.username,
    },
    {
      label: "First Name",
      type: "text",
      id: "first_name",
      name: "first_name",
      required: false,
      onChange: handleChange,
      value: formValue.first_name,
    },
    {
      label: "Last Name",
      type: "text",
      id: "last_name",
      name: "last_name",
      required: false,
      onChange: handleChange,
      value: formValue.last_name,
    },
    {
      label: "Email",
      type: "text",
      id: "email",
      name: "email",
      required: false,
      onChange: handleChange,
      value: formValue.email,
    },
    {
      label: "Phone",
      type: "text",
      id: "phone",
      name: "phone",
      required: false,
      onChange: handleChange,
      value: formValue.phone,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      required: false,
      onChange: handleChange,
      value: formValue.password,
    },
    {
      label: "Address 1",
      type: "text",
      id: "address1",
      name: "address1",
      required: false,
      onChange: handleChange,
      value: formValue.address1,
    },
    {
      label: "Address 2",
      type: "text",
      id: "address2",
      name: "address2",
      required: false,
      onChange: handleChange,
      value: formValue.address2,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formValue
      );
      if (response.status === 201) {
        alert(response.data.msg);
        setFormValue({
          username: "",
          first_name: "",
          last_name: "",
          address1: "",
          address2: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Sign up</h1>
      <div className="form-container">
        <form onSubmit={(e) => handleSubmit(e)} name="signup">
          <Form formElements={formElements} />
          <button type="button">Cancel</button>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
