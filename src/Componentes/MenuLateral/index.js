import React from 'react';
import { FaListAlt } from 'react-icons/fa';
import { MdQueue } from 'react-icons/md';

import useExpensesContext from '../../context/expensesController';

import './style.scss';

const MenuLateral = () => {
  const { setState } = useExpensesContext();

  return(
    <div id="menu">
      <div className="menu-container">
        <div  className="nav-item" onClick={() => setState("list")}>
          <FaListAlt className="icon" />
          <span>Lista de despesas</span>
        </div>
        <div  className="nav-item" onClick={() => setState("new")}>
          <MdQueue className="icon" />
          <span>Criar nova despesa</span>
        </div>
      </div>
    </div>
  );
}

export default MenuLateral;