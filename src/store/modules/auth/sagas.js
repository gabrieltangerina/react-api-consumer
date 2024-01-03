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

  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      if (password && (password.length < 6 || password.length > 50)) {
        toast.error("Senha deve ter entre 6 e 50 caracteres");
        yield put(actions.registerUpdatedPasswordInvalid());
        return;
      }

      yield call(axios.put, "/users", {
        nome,
        email,
        password: password || undefined,
      });
      toast.success("Dados editados");
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, "/users", {
        nome,
        email,
        password,
      });
      toast.success("Conta criada com sucesso");
      yield put(actions.registerCreatedSuccess());
      history.push("/login");
    }
  } catch (e) {
    // Pegando as mensagens de erros que vem da API
    const errors = get(e, "response.data.errors", []);
    const status = get(e, "response.status", 0);

    if (status === 401) {
      toast.error("Você precisa fazer login novamente");
      yield put(actions.loginFailure());
      history.push("/login");
      return;
    }

    if (errors.length > 0) {
      errors.map((err) => toast.error(err));
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
