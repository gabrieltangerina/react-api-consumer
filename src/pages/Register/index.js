/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useSelector, useDispatch } from "react-redux";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";
import * as actions from "../../store/modules/auth/actions";

export default function Register() {
  // stored porque está no store do redux
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.auth.isLoading);

  const dispath = useDispatch();

  React.useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 25) {
      formErrors = true;
      toast.error("Nome deve ter entre 3 a 25 caracteres");
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error("E-mail inválido");
    }

    if (!id && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error("Senha deve ter entre 6 e 50 caracteres");
    }

    if (formErrors) return;

    dispath(actions.registerRequest({ nome, email, password, id }));
  }

  return (
    <Container>
      <h1>{id ? "Editar conta" : "Criar conta"}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
          {isLoading ? (
            <Loading isLoading={isLoading} />
          ) : id ? (
            "Salvar"
          ) : (
            "Criar conta"
          )}
        </button>
      </Form>
    </Container>
  );
}
