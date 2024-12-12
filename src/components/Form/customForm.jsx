import { useState } from "react";
import "../Form/style.css";
import axios from "axios";

const CustomForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !phoneNum || !password) {
      console.log("Compila tutti i campi!");
      return;
    }

    axios
      .post("/users/create", { fullName, email, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h1>Registrati</h1>
      <form onSubmit={handleSubmit} className="registration-form pt-4 ">
        <p>Nome e cognome</p>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        ></input>
        <p>La tua email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p>Il tuo telefono</p>
        <input
          type="number"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        ></input>
        <p>La tua password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit" className="save-btn">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default CustomForm;
