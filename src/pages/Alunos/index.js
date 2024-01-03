import { React, useState, useEffect } from "react";
import { get } from "lodash";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";

import { AlunoContainer, ProfilePicture } from "./styled";
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

  return (
    <Container>
      <h1>Página de Alunos</h1>
      <AlunoContainer>
        <Loading isLoading={isLoading} />
        {alunos.map((aluno) => (
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
            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
