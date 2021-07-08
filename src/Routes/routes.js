import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Pages/Home";
import ListExpenses from "../Componentes/ListExpenses";
import NewExpense from "../Componentes/NewExpense";
import useExpensesContext from "../context/expensesController";

const OtherRoutes = () => {
  const { token } = useExpensesContext()

  return (
    <BrowserRouter>
      <Switch>
        {token && 
       <>
        <Route exact path="/" component={Home} />
        <Route exact path="/list-expenses" component={ListExpenses} />
        <Route exact path="/new-expense" component={NewExpense} />
       </>
        }
      </Switch>
    </BrowserRouter>
  );
};

export default OtherRoutes;
