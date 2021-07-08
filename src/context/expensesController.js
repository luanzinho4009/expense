import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const ExpensesContext = createContext({});


export const ExpensesContextProvider = ({children}) => {
  const [expenses, setExpenses] = useState([]);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [selected, setSelected] = useState([])
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [item, setItem] = useState();
  const [valor, setValor] = useState();
  const [descricao, setDescricao] = useState();

  useEffect(() => {
    const getStorageToken = sessionStorage.getItem("@App:token");

    if(getStorageToken) {
      setToken(getStorageToken);
    }
  },[token])

  const handleOpenModalView = () => {
    setOpenModalView(!openModalView);
  }
  const handleOpenModalEdit = () => {
    setOpenModalEdit(!openModalEdit);
  }

  const selectExpense = (index, edit) => {
    setSelected(expenses[index]);
    if(edit) {
      setOpenModalEdit(true)
      setItem(expenses[index].item);
      setValor(expenses[index].value);
      setDescricao(expenses[index].additionalInfo.description);
    }else {
      setOpenModalView(true);
    }
    console.log("cliquei")
  }

  const DeleteExpense = async (id,token) => {
    await api.delete(`/expenses/${id}`,{
      headers: {
        Authorization : `Bearer ${token}`
      }
    });
    setDeleted(!deleted);
  }

  const getAllExpenses = async (token) => {
    await api
      .get(
        "/expenses?page=1&perPage=10",
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setExpenses(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTokenWithEmail = async (email) => {
      await api.get(`/start/${email}`).then(res => {
        console.log(res.data)
        const storageToken = sessionStorage.setItem("@App:token", res.data.token);
        setToken(storageToken);
        console.log(token);
      })
  }

  return(
    <ExpensesContext.Provider
    value={{
      email, setEmail,
      token,
      loading, setLoading,
      getTokenWithEmail,
      expenses,setExpenses,
      getAllExpenses,
      deleted,setDeleted,
      DeleteExpense,
      handleOpenModalView,
      handleOpenModalEdit,
      selectExpense,
      selected,
      openModalView,
      openModalEdit,
      item,setItem,
      valor,setValor,
      descricao,setDescricao,
    }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default function useExpensesContext(){
  return useContext(ExpensesContext);
}
