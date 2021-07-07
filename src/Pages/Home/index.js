import React, { useEffect } from "react";
//componentes
import MenuLateral from "../../Componentes/MenuLateral";
import ListExpenses from "../../Componentes/ListExpenses";
import NewExpense from "./../../Componentes/NewExpense";
import Login from "./../Login";
//context
import useExpensesContext from "../../context/expensesController";

import "./style.scss";

const Home = () => {
  const { state, token } = useExpensesContext();

  useEffect(() => {
    console.log(token);
  });

  return (
    <div id="home">
      <div className="home-container">
        {state !== "Login" && token && <MenuLateral />}
        <div className="body">
          {state === "Login" && !token ? (
            <Login />
          ) : state === "list" && token ? (
            <ListExpenses />
          ) : (
            state === "new" && <NewExpense />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
