import React, { useState } from "react";
import useExpensesContext from "../../context/expensesController";
import { FiX } from "react-icons/fi";
import Input from "../Inputs/input";

import api from "./../../services/api";

import "./style.scss";

const ViewEditExpense = ({
  edit,
  id,
  Item,
  Value,
  Description,
  Installments,
  PaidInstallments,
  RemainingInstallments,
  AmountPaid,
  Data,
  SetItem,
  SetValue,
  SetDescription,
  SetInstallments,
  SetPaidInstallments,
  PayCartao,
  SetPayBoleto,
  PayBoleto,
  SetPayCartao,
}) => {
  const {
    token,
    handleOpenModalView,
    handleOpenModalEdit,
    item,
    value,
    description,
    installments,
    paidInstallments,
    payBoleto,
    payCartao,
    setUpdate,
    update,
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
      paidInstallments,
    };

    const newValor = parseFloat(data.value);
    const remainingInstallments = Math.ceil(
      data.installments - data.paidInstallments
    );
    const amountPaid = Math.ceil(
      (newValor / (data.installments !== 0 ? data.installments : 1)) *
        (data.paidInstallments !== 0 ? data.paidInstallments : 1)
    );

    await api.put(
      `/expenses/${id}`,
      {
        date: dateFormatada,
        item: data.item,
        value: newValor,
        additionalInfo: {
          description: data.description,
          payCartao: data.payCartao,
          payBoleto: data.payBoleto,
          installments: data.installments,
          paidInstallments: data.paidInstallments,
          remainingInstallments: remainingInstallments,
          amountPaid: amountPaid,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUpdate(!update);
    console.log(update);
    alert("Atualizado com sucesso!");
  };

  return (
    <div id="ViewEdit-expense">
      {edit ? (
        <div className="edit-expense-container">
          <div className="close">
            <FiX className="icon" onClick={handleOpenModalEdit} />
          </div>
          <form className="form" onSubmit={onSubmit}>
            <Input
              modal
              label="Nome do item:"
              type="text"
              name="item"
              value={Item}
              onChange={SetItem}
              style={{
                border: "1px solid var(--light)",
                color: "var(--light)",
              }}
            />
            <Input
              modal
              label="Valor Total:"
              className="input"
              type="text"
              name="valor"
              value={Value}
              onChange={SetValue}
              style={{
                border: "1px solid var(--light)",
                color: "var(--light)",
              }}
            />
            <Input
              modal
              label="Descrição"
              textarea
              className="input-area"
              type="textarea"
              name="description"
              value={description}
              onChange={SetDescription}
              style={{
                border: "1px solid var(--light)",
                color: "var(--light)",
              }}
            />
            <div className="checkboxs">
              <input
                type="checkbox"
                name="boleto"
                className="checkbox"
                value={PayBoleto}
                onChange={SetPayBoleto}
                disabled={PayCartao}
                checked={PayBoleto}
              />
              <label for="boleto">Pago no boleto</label>
              <input
                type="checkbox"
                name="cartao"
                className="checkbox"
                value={PayCartao}
                onChange={SetPayCartao}
                disabled={PayBoleto}
                checked={PayCartao}
              />
              <label for="cartao">Pago no cartão</label>
            </div>
            {PayCartao && (
              <>
                <Input
                  modal
                  label="Quantidade de parcelas:"
                  type="text"
                  name="installments"
                  value={Installments}
                  onChange={SetInstallments}
                  style={{
                    border: "1px solid var(--light)",
                    color: "var(--light)",
                  }}
                />
                <Input
                  modal
                  label="Parcelas já pagas:"
                  type="text"
                  name="paidInstallments"
                  value={PaidInstallments}
                  onChange={SetPaidInstallments}
                  style={{
                    border: "1px solid var(--light)",
                    color: "var(--light)",
                  }}
                />
              </>
            )}
            <button type="submit" className="button">
              Salvar
            </button>
          </form>
        </div>
      ) : (
        <div className="view-expense-container">
          <div className="close">
            <FiX className="icon" onClick={handleOpenModalView} />
          </div>
          <div className="items">
            <span>
              Nome do item: <br /> <strong>{Item}</strong>
            </span>
            <span>
              Valor total: <br /> <strong>{Value}</strong>
            </span>
            <span>
              Data de criação:
              <br /> <strong>{Data}</strong>
            </span>
            <span>
              Tipo de Pagamento:
              <br /> <strong>{PayCartao ? "Cartão de crédito" : "Boleto"}</strong>
            </span>
            {PayCartao && (
              <>
                <span>
                  Quantidade de parcelas:
                  <br /> <strong>{Installments}</strong>
                </span>
                <span>
                  Parcelas já pagas:
                  <br /> <strong>{PaidInstallments}</strong>
                </span>
                <span>
                  Parcelas restantes:
                  <br /> <strong>{RemainingInstallments}</strong>
                </span>
                <span>
                  Valor total pago:
                  <br /> <strong>{AmountPaid}</strong>
                </span>
              </>
            )}
            <span>
              Descrição:
              <br /> <strong>{Description}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewEditExpense;
