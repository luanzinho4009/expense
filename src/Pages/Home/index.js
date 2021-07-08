import React, { useEffect } from "react";
//context
import useExpensesContext from "../../context/expensesController";

import "./style.scss";

const Home = () => {
  const { token } = useExpensesContext();

  useEffect(() => {
    console.log(token);
  });

  return (
    <div id="home">
      <h1>Bem vindo!</h1>
      <h1><a href="/list-expenses">Cliqe aqui!</a> e veja sua lista de despesas, 
        caso ainda não tenha nenhuma <a href="/new-expense">cliqe aqui!</a></h1>
    </div>
  );
};

export default Home;
