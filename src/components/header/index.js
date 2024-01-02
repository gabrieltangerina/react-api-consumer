import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// Pegar ações disparadas (reducer)
import { useSelector } from "react-redux";

import { Nav } from "./styled";

export default function Header() {
  const botaoClicado = useSelector(
    (state) => state.exampleReducer.botaoClicado
  );

  return (
    <Nav>
      <Link to="/">
        <FaHome size={20} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={20} />
      </Link>
      <Link to="/login">
        <FaSignInAlt size={20} />
      </Link>
      {botaoClicado ? "Clicado" : "Não clicado"}
    </Nav>
  );
}
