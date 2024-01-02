import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: "REACT-API-CONSUMER",
      storage,
      // Recebe o nome do reducer, o nome dele está no rootReducer
      whitelist: ["auth"],
    },
    reducers
  );

  return persistedReducers;
};
