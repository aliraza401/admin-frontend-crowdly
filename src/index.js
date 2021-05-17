import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'; 
import { BrowserRouter } from 'react-router-dom'; 
import { ToastProvider } from 'react-toast-notifications';
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnchancer(applyMiddleware(Thunk))
);

ReactDOM.render( 
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={'/crowdly-admin'} >
        <ToastProvider autoDismiss autoDismissTimeout={3000} >
          <App />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(); 