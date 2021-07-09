import React from "react";

import logo from "../../assets/images/expense.jpg";

import "./style.scss";

const Home = () => {
  return (
    <div id="home">
      <img src={logo} alt="logo" className="logo" />
      <h1>Bem vindo!</h1>
      <h1>
        <a href="/list-expenses">Cliqe aqui!</a> e veja sua lista de despesas,
        caso ainda não tenha nenhuma <a href="/new-expense">cliqe aqui!</a>
      </h1>
    </div>
  );
};

export default Home;
