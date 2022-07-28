import React, { useState } from "react";
import "./Register/Register.css";


function Login(props) {
  const [infoAuth, setInfoAuth] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfoAuth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!infoAuth.email || !infoAuth.password) {
      return;
    }
    props.handleLogin(infoAuth);
    setInfoAuth({ email: "", password: "" });
  };

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>

      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input register__input_type_email"
          id="email"
          type="email"
          onChange={handleChange}
          value={infoAuth.email ?? ""}
          placeholder="Email"
          name="email"
          required
        />
        <input
          className="register__input register__input_type_password"
          id="password"
          type="password"
          onChange={handleChange}
          value={infoAuth.password ?? ""}
          placeholder="Пароль"
          name="password"
          required
        />
        <button className="register__submit button-hover" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
