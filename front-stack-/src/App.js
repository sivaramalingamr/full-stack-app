import logo from "./logo.svg";
import Intro from "./Components/Intro";
import "./App.css";
import ToDoApp from "./Components/TodoApp";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login";
import UsersList from "./Pages/UsersList/UsersList";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <div className="App">
      {/* <Intro name="John Doe" />
      <ToDoApp /> */}
      <Router>
        <nav>
          <Link className="nav" to="/">
            Intro
          </Link>
          <Link className="nav" to="/todo">
            ToDoApp
          </Link>
          <Link className="nav" to="/signup">
            Signup
          </Link>
          <Link className="nav" to="/login">
            Login
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Intro name="John Doe" />} />
          <Route path="/todo" element={<ToDoApp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
