import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form"; // Adjust the path as necessary
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [loginFormValue, setLoginFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginFormValue({
      ...loginFormValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginFormValue
      );
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("token", response.data.access_token);
        navigate("/users");
      }
    } catch (error) {
      const errMsg = error.response.data.msg;
      console.log(error);
      alert(errMsg);
    }
  };
  const loginFormElements = [
    {
      label: "Username",
      type: "text",
      id: "username",
      name: "username",
      required: false,
      onChange: handleChange,
      value: loginFormValue.username,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      required: false,
      onChange: handleChange,
      value: loginFormValue.password,
    },
  ];
  return (
    <div>
      <h1>Login</h1>
      <div className="form-container">
        <form name="loginForm" id="loginForm" onSubmit={(e) => handleSubmit(e)}>
          <Form formElements={loginFormElements} />
          <button type="button" onClick={() => navigate("/signup")}>
            Cancel
          </button>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
