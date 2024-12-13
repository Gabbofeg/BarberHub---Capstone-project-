import React from "react";
import axios from "axios";
import './style.css'

const Logging = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:4040/api/login", {
        email,
        password,
      });
      alert("Login effettuato con successo!");
      console.log("Token ricevuto:", response.data.token);
    } catch (error) {
      console.error("Errore durante il login:", error.response?.data || error);
      alert("Credenziali non valide!");
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:4040/api/auth/${provider}`;
  };

  return (
    <div className="login-container">
      <h1 className="login-text">Login</h1>
      <form onSubmit={handleLogin} className="credential-form">
        <input className="form-input" type="email" name="email" placeholder="Email" required />
        <input className="form-input" type="password" name="password" placeholder="Password" required />
        <button className="loginBtn" type="submit">Login</button>
      </form>
      <div className="login-option">
        <h2>Oppure accedi con:</h2>
        <button className="googleBtn"  onClick={() => handleOAuthLogin("google")}>Google</button>
        <button className="githubBtn" onClick={() => handleOAuthLogin("github")}>GitHub</button>
      </div>
    </div>
  );
};

export default Logging;