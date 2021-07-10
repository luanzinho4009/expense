import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const ExpensesContext = createContext({});


export const ExpensesContextProvider = ({children}) => {
  const [expenses, setExpenses] = useState([]);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading,setLoginLoading] = useState(false)
  const [deleted, setDeleted] = useState(false);
  const [selected, setSelected] = useState([]);
  const [update,setUpdate] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [item, setItem] = useState();
  const [value, setValue] = useState();
  const [description, setDescription] = useState();
  const [payBoleto,setPayBoleto] = useState();
  const [payCartao,setPayCartao] = useState();
  const [installments,setInstallments] = useState()
  const [paidInstallments, setPaidInstallments] = useState();
  const [page,setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [verifyNextPage,setVerifyNextPage] = useState([]);
  const [menuController,setMenuController] = useState(false);
  const [order,setOrder] = useState(true);

  useEffect(() => {
    const getStorageToken = sessionStorage.getItem("@App:token");

    if(getStorageToken) {
      setToken(getStorageToken);
    }
  })

  const OrderNamesA = (a,b) => {
    return (a.item > b.item) ? 1 : ((b.item > a.item) ? -1 : 0);
  }
  const OrderNamesB = (a,b) => {
    return (b.item > a.item) ? 1 : ((a.item > b.item) ? -1 : 0);
  }

  const handleMenu = () => {
    setMenuController(!menuController);
  }

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
      setValue(expenses[index].value);
      setDescription(expenses[index].additionalInfo.description);
      setPayBoleto(expenses[index].additionalInfo.payBoleto);
      setPayCartao(expenses[index].additionalInfo.payCartao);
      setInstallments(expenses[index].additionalInfo.installments);
      setPaidInstallments(expenses[index].additionalInfo.paidInstallments);
    }else {
      setOpenModalView(true);
    }
  }

  const DeleteExpense = async (id,token) => {
    await api.delete(`/expenses/${id}`,{
      headers: {
        Authorization : `Bearer ${token}`
      }
    });
    setDeleted(!deleted);
  }

  const nextPage = async () => {
    if(verifyNextPage.length > 0){
      setPage(page + 1);
    }
  }
  const previousPage = () => {
    if(page !== 1 ){
      setPage(page - 1);
    }
  }
  const getAllExpenses = async (token,page,perPage) => {
    await api
      .get(
        `/expenses?page=${page}&perPage=${perPage}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        if(order) {
          setExpenses(res.data.sort(OrderNamesA));
        } else {
          setExpenses(res.data.sort(OrderNamesB));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getNextPageExpenses = async (token,page,perPage) => {
    await api
      .get(
        `/expenses?page=${page + 1}&perPage=${perPage}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        setVerifyNextPage(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTokenWithEmail = async (email) => {
      await api.get(`/start/${email}`).then(res => {
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
      value,setValue,
      description,setDescription,
      payBoleto, setPayBoleto,
      payCartao,setPayCartao,
      installments,setInstallments,
      paidInstallments,setPaidInstallments,
      loginLoading,setLoginLoading,
      update,setUpdate,
      nextPage,previousPage,
      page,setPage,
      perPage,setPerPage,
      verifyNextPage,setVerifyNextPage,
      getNextPageExpenses,
      menuController, handleMenu,
      setMenuController,
      order, setOrder
    }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default function useExpensesContext(){
  return useContext(ExpensesContext);
}
