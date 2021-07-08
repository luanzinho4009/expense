import React from 'react';
import useExpensesContext from '../context/expensesController';
import LoginRoute from './loginRoute';
import OtherRoutes from './routes';




const Routes = () => {
  const { token }  = useExpensesContext();
  return token ? ( <OtherRoutes /> ) : ( <LoginRoute /> );
}

export default Routes;