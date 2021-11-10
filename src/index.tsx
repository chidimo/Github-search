import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { reduxPersistor, store } from './store/store';
import { ApolloProvider } from '@apollo/client';
import { appCache } from './cache/appCache';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        persistor={reduxPersistor}
        loading={<p>Loading persistor</p>}
      >
        <ApolloProvider client={appCache}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
