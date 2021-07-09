import React from "react";
import { FaListAlt, FaHome } from "react-icons/fa";
import { MdQueue } from "react-icons/md";

import "./style.scss";

const MenuLateral = () => {
  return (
    <div id="menu">
      <div className="menu-container">
        <a href="/" className="nav-item">
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
