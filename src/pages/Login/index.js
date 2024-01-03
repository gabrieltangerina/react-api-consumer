import React from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import * as actions from "../../store/modules/auth/actions";
import Loading from "../../components/Loading";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const prevPath = get(props, "location.state.prevPath", "/");
  const isLoading = useSelector((state) => state.auth.isLoading);

  function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (email.trim() === "") {
      formErrors = true;
      toast.error("E-mail é um campo obrigatório");
    } else if (!isEmail(email)) {
      formErrors = true;
      toast.error("E-mail inválido");
    }

    if (password.trim() === "") {
      formErrors = true;
      toast.error("Senha é um campo obrigatório");
    } else if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error("Senha inválida");
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <h1>Página de Login</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          E-mail:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </label>
        <button type="submit">
          {isLoading ? <Loading isLoading={isLoading} /> : "Logar"}{" "}
        </button>
      </Form>
    </Container>
  );
}
