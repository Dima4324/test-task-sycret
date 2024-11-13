import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { certificateReducer } from "./reducers/certificate-reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(certificateReducer, composeEnhancers(applyMiddleware(thunk)))