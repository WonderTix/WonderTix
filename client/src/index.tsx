import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Auth0ProviderWithHistory
  from './components/Authentication/auth0-provider-with-history';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './components/Ticketing/app/store';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
