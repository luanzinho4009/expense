import React, { useEffect } from "react";
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
    setVerifyNextPage,
    getNextPageExpenses,
  } = useExpensesContext();

  function FormatData(data) {
    data = moment().format("DD-MM-YYYY");
    return data;
  }

  useEffect(() => {
    getNextPageExpenses(token, page);
    console.log(verifyNextPage);
  }, [page]);

  useEffect(() => {
    if (token) {
      getAllExpenses(token, page);
    }
    console.log("home", expenses);
  }, [deleted || update || page]);

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
