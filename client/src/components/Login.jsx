import React, { useState, createContext } from "react";
import "./login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import joi from "joi";

const ThemeContext = createContext();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const schema = joi.object({
      email: joi.string().email().required().messages({
        "string.base": "Email should be valid",
        "string.empty": "Email is required",
      }),
      password: joi
        .string()
        .min(6)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .messages({
          "string.base": "Password should be valid",
          "string.empty": "Password is required",
          "string.min": "Password should have a minimum length of 8",
          "string.pattern.base": "Password should have a minimum length of 8",
        }),
    });

    const { error } = schema.validate({ email, password });

    if (error) {
      setErrorMessage(error.details[0].message);
    } else {
      setErrorMessage("");
      axios
        .post("http://localhost:5050/members/login", { email, password })
        .then((response) => {
          navigate("/home");
        })
        .catch((error) => {
          if (error.response) {
            // Request was made and server responded with a status code
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            // Request was made but no response received
            setErrorMessage("No response received from the server.");
          } else {
            // Something else happened in making the request
            setErrorMessage("An error occurred while processing the request.");
          }
        });
    }
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
            <form onSubmit={handleFormSubmit}>
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
              <button className="btn" type="submit">
                Login
              </button>
            </form>
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
