import React from "react";
import useExpensesContext from "../../context/expensesController";

import LoadSpinner from "./../../Componentes/Spinner";
import Input from "../../Componentes/Inputs/input";

import logo from '../../assets/images/expense.jpg';

import "./style.scss";

const Login = () => {
  const { email, setEmail, getTokenWithEmail, loginLoading, setLoginLoading } =
    useExpensesContext();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === " ") {
      return;
    }
    setLoginLoading(true);
    await getTokenWithEmail(email);
  };

  return (
    <div id="login">
      <img src={logo} alt="logo" className="logo" />
      <h1>Digite seu email para cadastrar e entrar em sua conta!</h1>
      <form className="login-container" onSubmit={onSubmit}>
        <Input
          label="Email:"
          className="input"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="button">
          {loginLoading ? <LoadSpinner /> : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
