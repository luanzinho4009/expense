import React,{ useState, useEffect } from "react";
import { FaListAlt, FaHome } from "react-icons/fa";
import { MdQueue } from "react-icons/md";
import { BiMenuAltLeft, BiMenuAltRight } from 'react-icons/bi';

import "./style.scss";
import useExpensesContext from "../../context/expensesController";

const MenuLateral = () => {
  const { menuController, handleMenu } = useExpensesContext();

  return (
    <div id="menu">
      <div className="icon-menu">
        {!menuController ? 
        <BiMenuAltLeft className="icon" onClick={handleMenu} /> :
        <BiMenuAltRight className="icon" onClick={handleMenu} />
        }
      </div>
      <div className={menuController ? "menu-container close" : "menu-container"}>
        <a href="/" className="nav-item" >
          <FaHome className="icon" />
          <span>Home</span>
        </a>
        <a href="/list-expenses" className="nav-item">
          <FaListAlt className="icon" />
          <span>Lista de despesas</span>
        </a>
        <a href="/new-expense" className="nav-item">
          <MdQueue className="icon" />
          <span>Criar nova despesa</span>
        </a>
      </div>
    </div>
  );
};

export default MenuLateral;
