import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ExpensesContextProvider } from "./context/expensesController";

ReactDOM.render(
  <React.StrictMode>
    <ExpensesContextProvider>
      <App />
    </ExpensesContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
