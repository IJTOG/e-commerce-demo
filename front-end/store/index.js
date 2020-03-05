import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { apiMiddleware } from "redux-api-middleware";
import rootReducer from "../redux/reducers";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import createEncryptor from "redux-persist-transform-encrypt";

const encryptor = createEncryptor({
  secretKey: "Release-Tracker"
});

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["loading"],
  transforms: [encryptor]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const middlewares = [
    apiMiddleware,
    thunk
    //  logger
  ];
  let store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept("../redux/reducers", () =>
      store.replaceReducer(rootReducer)
    );
  }

  return { store, persistor };
};

export { configureStore };
