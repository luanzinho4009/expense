import useExpensesContext from "./context/expensesController";
import Routes from "./Routes";
import "./Styles/_global.scss";
import MenuLateral from "./Componentes/MenuLateral";

function App() {
  const { token } = useExpensesContext();
  return (
    <div className="app-container">
      {token && <MenuLateral />}
      <div className={token ? "body" : "body-login"}>
         <Routes />
      </div>
    </div>
  );
}

export default App;
