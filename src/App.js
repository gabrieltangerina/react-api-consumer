import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Redux (Variáveis Globais)
import { Provider } from "react-redux";

// Persist (Armazena mudanças de estado)
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import history from "./services/history";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/header";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} className="toastify-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
