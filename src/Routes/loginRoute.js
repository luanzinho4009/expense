import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import useExpensesContext from '../context/expensesController';
import Login from '../Pages/Login';



const LoginRoute = () => {
  const { token } = useExpensesContext()
  return(
    <BrowserRouter>
      <Switch>
        {!token && <Route exact path="/" component={Login} />}
      </Switch>
    </BrowserRouter>
  );
}

export default LoginRoute;