import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from "redux";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootSaga } from "./root-saga";
import createSagaMiddleWare from "redux-saga";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const sagaMiddleWare = createSagaMiddleWare();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
	process.env.NODE_ENV !== "production" && logger,
	sagaMiddleWare,
].filter(Boolean);

const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
