import React from "react";
import useExpensesContext from "../../context/expensesController";

import "./style.scss";

const Login = () => {
  const { email, setEmail, getTokenWithEmail } =
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
        <label>Email:</label>
        <input 
        className="input" 
        type="text" 
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="button">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
