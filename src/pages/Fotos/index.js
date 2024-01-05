import React, { useEffect } from "react";
import { get } from "lodash";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Fotos() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const userId = id ?? null;

  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${userId}`);
        setFoto(data.Fotos[0].url);

        setIsLoading(false);
      } catch (error) {
        toast.error("Erro ao obter a imagem");
        console.log(error);
        setIsLoading(false);
        history.push("/");
      }
    };

    getData();
  }, [userId]);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append("aluno_id", userId);
    formData.append("foto", file);

    try {
      setIsLoading(true);

      await axios.post("/fotos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Foto enviada com sucesso");

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      const { status } = get(err, "response", "");
      toast.error("Erro ao enviar a foto");

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <h1>Página de Fotos {userId} </h1>
      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" crossOrigin="" /> : "Selecionar"}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
        <button type="submit">
          {isLoading ? <Loading isLoading={isLoading} /> : "Adicionar foto"}
        </button>
      </Form>

      <Loading isLoading={isLoading} />
    </Container>
  );
}
