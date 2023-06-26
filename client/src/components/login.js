import React, { useState, createContext } from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ThemeContext = createContext();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const navigate = useNavigate();
  const handleEmpty = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all the fields");
    } else {
      setErrorMessage("");
      alert("Form submitted successfully");
    }
    const values = {
      email,
      password,
    };

    axios.post("http://localhost:2020/members/login", values).then((res) => {
      navigate("/home");
    });
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`login ${theme}`}>
        <div className="hero">
          <div className="left-side">
            <div className="overlay"></div>
            <h3>A Room Without a book its like a body without a soul!</h3>
            <p>Get your new book with the best price.</p>
          </div>
          <div className="form-container">
            <h4>Login</h4>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleEmpty}>
              <input
                value={email}
                type="text"
                placeholder="Email*"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                type="password"
                placeholder="Password*"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <button className="btn" type="submit">
              Login
            </button>
            <p>
              Don't have an account? <Link to="/Signup">Sign up</Link>
            </p>
            <button className="btn-e" onClick={toggleTheme}>
              Toggle Theme
            </button>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Login;
