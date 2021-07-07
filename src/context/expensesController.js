import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const ExpensesContext = createContext({});


export const ExpensesContextProvider = ({children}) => {
  const [expenses, setExpenses] = useState([]);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const [state,setState] = useState("Login");

  useEffect(() => {
    const getStorageToken = sessionStorage.getItem("@App:token");

    if(getStorageToken) {
      setToken(getStorageToken);
      setState("list");
    }
  },[token])

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
      state, setState,
      getTokenWithEmail
    }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default function useExpensesContext(){
  return useContext(ExpensesContext);
}
