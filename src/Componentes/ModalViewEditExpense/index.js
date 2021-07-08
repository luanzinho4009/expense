import React, { useState } from "react";
import useExpensesContext from "../../context/expensesController";
import { FiX } from 'react-icons/fi'
import Input from "../Inputs/input";

import api from "./../../services/api";

import "./style.scss";

const ViewEditExpense = ({edit,id,Item,Valor,Descricao, Data, SetItem,SetValor,SetDescricao}) => {
  const { 
    token, 
    handleOpenModalView, 
    handleOpenModalEdit ,
    item,
    valor,
    descricao,
  } = useExpensesContext();

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

    
    await api.put(
      `/expenses/${id}`,
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
    
  };

  return (
    <div id="ViewEdit-expense">
      {edit ? 
      <div className="edit-expense-container">
        <div className="close"><FiX className="icon" onClick={handleOpenModalEdit} /></div>
        <form className="form" onSubmit={onSubmit}>
          <Input
            label="Nome do item:"
            type="text"
            name="item"
            value={Item}
            onChange={SetItem}
          />
          <Input
            label="Valor"
            className="input"
            type="text"
            name="valor"
            value={Valor}
            onChange={SetValor}
          />
          <Input
            label="Descrição"
            textarea
            className="input-area"
            type="textarea"
            name="description"
            value={Descricao}
            onChange={SetDescricao}
          />
          <button type="submit" className="button">
            Salvar
          </button>
        </form>
        
      </div>
      :
      <div className="view-expense-container">
       <div className="close"><FiX className="icon" onClick={handleOpenModalView} /></div>
        <div className="items">
          <span>Nome do item: <br /> <strong>{Item}</strong></span>
          <span>Valor: <br /> <strong>{Valor}</strong></span>
          <span>Data de criação:<br /> <strong>{Data}</strong></span>
          <span>Descrição:<br /> <strong>{Descricao}</strong></span>
        </div>
      </div>
    }
    </div>
  );
};

export default ViewEditExpense;
