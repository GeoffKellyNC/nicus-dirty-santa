import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ThemeProvider} from 'styled-components';
import theme from './theme/theme';
import { BrowserRouter as Router } from 'react-router-dom';




import { Provider } from 'react-redux';
import { applyMiddleware, compose, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './store/root.reducer'






const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = legacy_createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </Router>
);