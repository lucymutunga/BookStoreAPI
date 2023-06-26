import React, { useState, createContext } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ThemeContext = createContext();

const Signup = () => {
  const [name, setName] = useState(""); // [state, setState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      name,
      email,
      password,
      confirmPassword,
    };

    axios.post("http://localhost:2020/members/signup", values).then((res) => {
      navigate("/login");
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
            <h4>Sign Up</h4>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleEmpty}>
              <input
                value={name}
                type="text"
                placeholder="Enter your name*"
                required
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                value={confirmPassword}
                type="password"
                placeholder="Confirm your password*"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </form>
            <button className="btn" type="submit">
              Signup
            </button>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
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

export default Signup;

