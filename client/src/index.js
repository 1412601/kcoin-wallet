import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
// import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";

//For calling API in console browser
import axios from "axios";
window.axios = axios;

const store = createStore(
  () => ({}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk, reduxLogger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
registerServiceWorker();
