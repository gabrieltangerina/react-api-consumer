import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as actions from "./actions";
import * as types from "../types";

// Função assíncrona simulando uma chamada de API
const requisicao = () =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

// Saga para tratar a ação BOTAO_CLICADO_REQUEST
function* exampleRequest() {
  try {
    // Chamada assíncrona usando o efeito call
    yield call(requisicao);

    // Despacha uma ação de sucesso
    yield put(actions.clicaBotaoSuccess());
    toast.success("Requisição concluida com sucesso");
  } catch (e) {
    // Despacha uma ação de falha em caso de erro
    yield put(actions.clicaBotaoFailure());
    toast.error("Ocorreu um erro");
  }
}

// Assina a ação BOTAO_CLICADO_REQUEST e executa exampleSaga
export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
