import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CtxProvider from "./Context/ProductsContext";
import "./index.css";
import App from "./App";

// import { combineReducers, createStore } from 'redux';
// import { Provider } from "react-redux";
// import productReducer from "./store/reducers/products";

// const rootReducer = combineReducers({
//   shop: productReducer,
// });

// const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CtxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CtxProvider>
);
