import React from "react";
import { useDispatch } from "react-redux";

import { Title } from "./styled";
import { Container } from "../../styles/GlobalStyles";

import * as exampleActions from "../../store/modules/example/actions";

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title>
        Página de Login
        <small>Apenas um small</small>
      </Title>
      <p>Qualquer coisa aqui</p>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
