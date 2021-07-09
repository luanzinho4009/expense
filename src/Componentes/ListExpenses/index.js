import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaTrash, FaEye } from "react-icons/fa";
import { FiEdit, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useExpensesContext from "../../context/expensesController";
import LoadSpinner from "./../Spinner";

import "./style.scss";
import ViewEditExpense from "../ModalViewEditExpense";

const ListExpenses = () => {
  const {
    token,
    expenses,
    getAllExpenses,
    loading,
    deleted,
    DeleteExpense,
    openModalView,
    openModalEdit,
    selected,
    selectExpense,
    item,
    value,
    description,
    setItem,
    setValue,
    setDescription,
    installments,
    setInstallments,
    paidInstallments,
    setPaidInstallments,
    payCartao,
    setPayCartao,
    payBoleto,
    setPayBoleto,
    update,
    page,
    setPage,
    nextPage,
    previousPage,
    verifyNextPage,
    perPage,
    setPerPage,
    getNextPageExpenses,
  } = useExpensesContext();
  const [valueOptions, setValueOptions] = useState(" ");

  function FormatData(data) {
    data = moment().format("DD-MM-YYYY");
    return data;
  }
  const QtdItensPerPage = () => {
    if (valueOptions !== " ") {
      setPerPage(valueOptions);
    }
  };
  const options = [
    { value: " ", label: "Qtd. de itens por página" },
    { value: "5", label: "5 itens por página" },
    { value: "10", label: "10 itens por página" },
    { value: "15", label: "15 itens por página" },
    { value: "20", label: "20 itens por página" },
  ];

  useEffect(() => {
    getNextPageExpenses(token, page, perPage);
    if (verifyNextPage.length === 0) {
      setPage(page === 1 ? 1 : page - 1);
    }
    console.log("verify", verifyNextPage);
  }, [page, deleted, perPage]);

  useEffect(() => {
    if (token) {
      getAllExpenses(token, page, perPage);
    }
    console.log("home", expenses);
  }, [deleted, update, page, perPage]);

  return (
    <>
      {openModalView && (
        <ViewEditExpense
          Item={selected?.item}
          Value={selected?.value}
          Data={FormatData(selected?.date)}
          Description={selected?.additionalInfo.description}
          PayCartao={selected?.additionalInfo.payCartao}
          Installments={selected?.additionalInfo.installments}
          PaidInstallments={selected?.additionalInfo.paidInstallments}
          RemainingInstallments={selected?.additionalInfo.remainingInstallments}
          AmountPaid={selected?.additionalInfo.amountPaid}
        />
      )}
      {openModalEdit && (
        <ViewEditExpense
          edit
          id={selected?._id}
          Item={item}
          SetItem={(e) => setItem(e.target.value)}
          Value={value}
          SetValue={(e) => setValue(e.target.value)}
          Description={description}
          SetDescription={(e) => setDescription(e.target.value)}
          Installments={installments}
          SetInstallments={(e) => setInstallments(e.target.value)}
          PaidInstallments={paidInstallments}
          SetPaidInstallments={(e) => setPaidInstallments(e.target.value)}
          PayCartao={payCartao}
          SetPayCartao={(e) => setPayCartao(e.target.checked)}
          PayBoleto={payBoleto}
          SetPayBoleto={(e) => setPayBoleto(e.target.checked)}
        />
      )}
      <div id="list-expenses">
        <h1>Lista de Despesas</h1>
        {expenses.length > 0 && (
          <div className="filter">
            <select
              placeholder="Quantidade de itens por página"
              onChange={(e) => setValueOptions(e.target.value)}
              value={valueOptions}
            >
              {options.map((option, index) => {
                return <option value={option.value}>{option.label}</option>;
              })}
            </select>
            <button type="button" onClick={QtdItensPerPage}>
              Filtrar
            </button>
          </div>
        )}
        {expenses.length > 0 ? (
          <table className="table-expenses">
            {!loading ? (
              <>
                <tr>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
                <tbody>
                  {expenses.map((expense, index) => {
                    return (
                      <tr key={expense._id}>
                        <td>
                          <a href="#">{expense.item} </a>
                        </td>
                        <td>{expense.value}</td>
                        <td>{FormatData(expense.date)}</td>
                        <td>
                          <div className="options">
                            <FaTrash
                              className="icon"
                              onClick={() => DeleteExpense(expense._id, token)}
                            />
                            <FiEdit
                              className="icon"
                              onClick={() => selectExpense(index, true)}
                            />
                            <FaEye
                              className="icon"
                              onClick={() => selectExpense(index, false)}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            ) : (
              <div className="loading">
                <LoadSpinner />
              </div>
            )}
          </table>
        ) : (
          <>
            {!loading ? (
              <div className="not-expenses">
                <h1>
                  Você não tem despesas Cadastradas.
                  <a href="/new-expense">Clique aqui para adicionar uma.</a>
                </h1>
              </div>
            ) : (
              <div className="loading">
                <LoadSpinner />
              </div>
            )}
          </>
        )}
        {expenses.length > 0 && (
          <div className="pagination">
            <button
              type="button"
              className="button-arrow"
              onClick={previousPage}
              disabled={page === 1}
            >
              <FiChevronLeft className="arrow" />
            </button>
            <span>{page}</span>
            <button
              type="button"
              className="button-arrow"
              onClick={nextPage}
              disabled={verifyNextPage.length === 0}
            >
              <FiChevronRight className="arrow" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListExpenses;
