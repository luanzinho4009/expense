import React from "react";
import useExpensesContext from "../../context/expensesController";

import "./style.scss";
import LoadSpinner from './../../Componentes/Spinner/index';
import Input from "../../Componentes/Inputs/input";

const Login = () => {
  const { email, setEmail, getTokenWithEmail, loginLoading } =
    useExpensesContext();

    const onSubmit = async (e) => {
        e.preventDefault();

        if(email.trim() === " "){
          return;
        }

        await getTokenWithEmail(email);
    }

  return (
    <div id="login">
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
          {loginLoading ? <LoadSpinner height={50} width={50} />  : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
