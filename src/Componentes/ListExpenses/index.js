import React,{ useEffect } from 'react';
import moment from 'moment';
import { FaTrash, FaEye } from 'react-icons/fa'
import useExpensesContext from '../../context/expensesController';
import LoadSpinner from './../Spinner';


import './style.scss'


const ListExpenses = () => {
  const  { token, expenses, getAllExpenses, loading, deleted, DeleteExpense } = useExpensesContext()
  
  function FormatData(data){
    data = moment().format('DD-MM-YYYY');
    return data;
  }

  useEffect(() => {
    if (token) {
      getAllExpenses(token);
    }
    console.log("home",expenses);
  },[deleted]);

  return(
    <div id="list-expenses">
      <h1>Lista de Despesas</h1>
      <table className="table-expenses">
        {!loading ? 
        <>
        <tr>
          <th>Nome</th>
          <th>Valor</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
        <tbody>
          {expenses.map(expense => {
            return(
              <tr key={expense._id}>
                <td><a href="#" >{expense.item} </a></td>
                <td>{expense.value}</td>
                <td>{FormatData(expense.date)}</td>
                <td>
                  <div className="options">
                    <FaTrash className="icon" onClick={() => DeleteExpense(expense._id, token)} />
                    <FaEye className="icon" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        </>
        :
        <div className="loading">
          <LoadSpinner />
        </div>
        }
      </table>
    </div>
  );
}

export default ListExpenses;