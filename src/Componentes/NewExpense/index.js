import React from "react";
import useExpensesContext from "../../context/expensesController";
import Input from "../Inputs/input";
import newExpense from "../../assets/images/newExpense.png";

import api from "./../../services/api";

import "./style.scss";

const NewExpense = () => {
  const {
    token,
    item,
    value,
    description,
    setItem,
    setValue,
    setDescription,
    payBoleto,
    setPayBoleto,
    payCartao,
    setPayCartao,
    installments,
    setInstallments,
    paidInstallments,
    setPaidInstallments,
  } = useExpensesContext();

  const onSubmit = async (e) => {
    e.preventDefault();
    let date = new Date();
    let dateFormatada =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    const data = {
      item,
      value,
      description,
      payBoleto,
      payCartao,
      installments,
      paidInstallments
    };

    const newValor = parseFloat(data.value);
    const remainingInstallments = Math.ceil(data.installments - data.paidInstallments);
    const amountPaid = Math.ceil((newValor 
      / (data.installments !== 0 ? data.installments : 1)) 
      * (data.paidInstallments !== 0 ? data.paidInstallments : 1))

    await api.post(
      "/expenses",
      {
        date: dateFormatada,
        item: data.item,
        value: newValor,
        additionalInfo: {
          description: data.description,
          payCartao: data.payCartao ? true : false,
          payBoleto: data.payBoleto ? true : false,
          installments: data.installments,
          paidInstallments: data.paidInstallments,
          remainingInstallments: remainingInstallments,
          amountPaid: amountPaid
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setItem(" ");
    setValue(" ");
    setDescription(" ");
    setInstallments(" ");
    setPaidInstallments(" ")
    setPayBoleto(false)
    setPayCartao(false);
    alert("Despesa criada com sucesso!");
  };

  return (
    <div id="new-expense">
      <img src={newExpense} alt="logo" className="logo" />
      <div className="new-expense-container">
        <form className="form" onSubmit={onSubmit}>
          <Input
            label="Nome do item:"
            type="text"
            name="item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <Input
            label="Valor Total:"
            type="text"
            name="valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Input
            label="Descrição:"
            textarea
            type="textarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="checkboxs">
            <input
              type="checkbox"
              name="boleto"
              className="checkbox"
              value={payBoleto}
              onChange={(e) => setPayBoleto(e.target.checked)}
              disabled={payCartao}
            />
            <label for="boleto">Pago no boleto</label>
            <input
              type="checkbox"
              name="cartao"
              className="checkbox"
              value={payCartao}
              onChange={(e) => setPayCartao(e.target.checked)}
              disabled={payBoleto}
            />
            <label for="cartao">Pago no cartão</label>
          </div>
          {payCartao && (
            <>
              <Input
                label="Quantidade de parcelas:"
                type="text"
                name="installments"
                value={installments}
                onChange={(e) => setInstallments(e.target.value)}
              />
              <Input
                label="Parcelas já pagas:"
                type="text"
                name="paidInstallments"
                value={paidInstallments}
                onChange={(e) => setPaidInstallments(e.target.value)}
              />
            </>
          )}
          <button type="submit" className="button">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewExpense;
