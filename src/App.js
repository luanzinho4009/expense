import { ExpensesContextProvider } from "./context/expensesController";
import Routes from "./Routes/routes";
import './Styles/_global.scss';

function App() {
  return (
     <ExpensesContextProvider>
        <Routes />
     </ExpensesContextProvider>
  );
}

export default App;
