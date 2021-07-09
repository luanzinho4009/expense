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
    valor,
    descricao,
    setItem,
    setValor,
    setDescricao,
    update,
    page,
    nextPage,
    previousPage,
    verifyNextPage,
    perPage,
    setPerPage,
    getNextPageExpenses,
  } = useExpensesContext();
  const [value, setValue] = useState(" ");

  function FormatData(data) {
    data = moment().format("DD-MM-YYYY");
    return data;
  }
  const QtdItensPerPage = () => {
    if (value !== " ") {
      setPerPage(value);
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
          Valor={selected?.value}
          Data={FormatData(selected?.date)}
          Descricao={selected?.additionalInfo.description}
        />
      )}
      {openModalEdit && (
        <ViewEditExpense
          edit
          id={selected?._id}
          Item={item}
          SetItem={(e) => setItem(e.target.value)}
          Valor={valor}
          SetValor={(e) => setValor(e.target.value)}
          Descricao={descricao}
          SetDescricao={(e) => setDescricao(e.target.value)}
        />
      )}
      <div id="list-expenses">
        <h1>Lista de Despesas</h1>
        <div className="filter">
          <select
            placeholder="Quantidade de itens por página"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          >
            {options.map((option, index) => {
              return <option value={option.value}>{option.label}</option>;
            })}
          </select>
          <button type="button" onClick={QtdItensPerPage}>
            Filtrar
          </button>
        </div>
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
      </div>
    </>
  );
};

export default ListExpenses;
