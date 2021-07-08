import React, { useState } from "react";
import useExpensesContext from "../../context/expensesController";

import api from "./../../services/api";

import "./style.scss";

const NewExpense = () => {
  const { token, setState } = useExpensesContext();
  const [item, setItem] = useState();
  const [valor, setValor] = useState();
  const [descricao, setDescricao] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    let date = new Date();
    let dateFormatada =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const data = {
      item,
      valor,
      descricao,
    };

    const newValor = parseFloat(data.valor);

    await api.post(
      "/expenses",
      {
        date: dateFormatada,
        item: data.item,
        value: newValor,
        additionalInfo: {
          description: data.descricao,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setItem(" ");
    setValor(" ");
    setDescricao(" ");
    setState("list");

    console.log(data.item, data.valor, data.descricao);
  };

  return (
    <div id="new-expense">
      <div className="new-expense-container">
        <form className="form" onSubmit={onSubmit}>
          <label>Nome do item:</label>
          <input
            className="input"
            type="text"
            name="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <label>Valor:</label>
          <input
            className="input"
            type="text"
            name="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <label>Descrição:</label>
          <textarea
            className="input-area"
            type="textarea"
            name="description"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <button type="submit" className="button">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewExpense;
