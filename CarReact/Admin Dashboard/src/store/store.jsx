import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";


//redux dev tool
const composer =
   typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

const middleWare = composer(applyMiddleware(thunk));

const store = createStore(reducers, middleWare);

export default store;






