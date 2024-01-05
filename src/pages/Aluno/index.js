/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { isEmail, isInt, isFloat } from "validator";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaEdit, FaUserCircle } from "react-icons/fa";

import { get } from "lodash";
import { Container } from "../../styles/GlobalStyles";
import { Form, ProfilePicture } from "./styled";
import Loading from "../../components/Loading";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Aluno() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const userId = id ?? null;

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState("");

  useEffect(() => {
    if (!userId) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${userId}`);
        const Foto = get(data, "Fotos[0].url", "");

        setFoto(Foto);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, "response.status", 0);

        if (status === 400) {
          toast.error("Usuário não encontrado");
          history.push("/");
        } else {
          toast.error("Ocorreu um erro inesperado");
          history.push("/");
        }
      }
    }

    getData();
  }, [userId]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 20) {
      toast.error("Nome deve ter entre 3 e 20 caracteres");
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 20) {
      toast.error("Sobrenome deve ter entre 3 e 20 caracteres");
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error("E-mail inválido");
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error("Idade inválida");
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error("Peso inválido");
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error("Altura inválido");
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (userId) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno(a) editado(a) com sucesso");
      } else {
        await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno(a) criado(a) com sucesso");
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      const status = get(err, "response.status", 0);
      const data = get(err, "response.data", {});
      const errors = get(data, "errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro desconhecido");
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Container>
      <h1>{userId ? "Editar aluno" : "Adicionar aluno"}</h1>

      {id && (
        <ProfilePicture>
          {foto ? (
            <img src={foto} alt={nome} crossOrigin="" />
          ) : (
            <FaUserCircle size={130} />
          )}
          <Link to={`/fotos/${userId}`}>
            <FaEdit size={22} />
          </Link>
        </ProfilePicture>
      )}

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
        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Sobrenome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="idade">
          Idade:
          <input
            type="text"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Idade"
          />
        </label>
        <label htmlFor="peso">
          Peso:
          <input
            type="text"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Peso"
          />
        </label>
        <label htmlFor="altura">
          Altura:
          <input
            type="text"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Altura"
          />
        </label>
        <button type="submit">
          {isLoading ? (
            <Loading isLoading={isLoading} />
          ) : userId ? (
            "Editar aluno"
          ) : (
            "Adicionar aluno"
          )}
        </button>
      </Form>
    </Container>
  );
}
