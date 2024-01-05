import { React, useState, useEffect } from "react";
import { get } from "lodash";
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { AlunoContainer, ProfilePicture, NovoAluno } from "./styled";
import { Container } from "../../styles/GlobalStyles";
import axios from "../../services/axios";
import Loading from "../../components/Loading";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get("/alunos");
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();

    const iconExclamation = e.currentTarget.nextSibling;
    e.currentTarget.remove();
    iconExclamation.setAttribute("display", "block");
  };

  const handleDelete = async function (e, id, index) {
    try {
      setIsLoading(true);

      await axios.delete(`/alunos/${id}`);

      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
      toast.success("Aluno apagado com sucesso");
    } catch (err) {
      const status = get(err, "response.status", 0);

      if (status === 401) {
        toast.error("Você precisa fazer login");
      } else {
        toast.error("Ocorreu um erro inesperado");
      }

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1>Página de Alunos</h1>

      <NovoAluno to="/aluno/">Adicionar aluno</NovoAluno>

      <AlunoContainer>
        <Loading isLoading={isLoading} />
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, "Fotos[0].url", false) ? (
                <img crossOrigin="" src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>
              {aluno.nome} {aluno.sobrenome}{" "}
            </span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link to={`/aluno/${aluno.id}/delete`} onClick={handleDeleteAsk}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
