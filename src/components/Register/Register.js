import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register(props) {
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
    props.handleRegister(infoAuth);
    setInfoAuth({ email: "", password: "" });
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>

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
          Зарегистрироваться
        </button>
      </form>
      <Link className="register__caption button-hover" to="/sign-in">
        <span>Уже зарегистрированы? Войти</span>
      </Link>
    </div>
  );
}

export default Register;
