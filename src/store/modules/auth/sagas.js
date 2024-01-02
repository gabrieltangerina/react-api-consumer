import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { get } from "lodash";
import * as actions from "./actions";
import * as types from "../types";
import axios from "../../../services/axios";
import history from "../../../services/history";

// Saga para tratar a ação LOGIN_REQUEST
function* loginRequest({ payload }) {
  try {
    // A API já retorna um status de erro então nao precisa verificar o response
    const response = yield call(axios.post, "/tokens", payload);

    yield put(actions.loginSuccess({ ...response.data }));
    toast.success("Login feito com sucesso");

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error("Usuário ou senha inválidos");

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const authState = get(payload, "auth", {});
  const token = get(authState, "token", "");

  console.log("authState", authState);
  console.log("token", token);

  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
