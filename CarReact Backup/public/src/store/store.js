import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

//redux dev tool
// const composer =
//    typeof window === 'boolean'
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const composeEnhancers =
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const middleware = composer(applyMiddleware(thunk));
// const store = createStore(reducers, composeEnhancers );
const composer =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middleWare = composer(applyMiddleware(thunk));

const store = createStore(reducers, middleWare);

export default store;
