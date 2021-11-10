import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { rootReducer } from './rootReducer';

import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { IS_PROD, IS_TEST } from '../dotEnvSettings';


const logger = createLogger({
  diff: true,
  duration: true,
  logErrors: true,
  collapsed: (getState: any, action: any, logEntry: any) => !logEntry.error,
  predicate: () => {
    switch (true) {
      case IS_TEST:
        return false;
      case IS_PROD:
        return false;
      default:
        return true;
    }
  },
});

const initialState = {};
const middlewares = [ logger ];

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [
    'redux__login_slice',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const devTools = IS_PROD
  ? applyMiddleware(...middlewares)
  : composeWithDevTools(applyMiddleware(...middlewares, logger));

const store = createStore(persistedReducer, initialState, devTools);

const reduxPersistor = persistStore(store);
export { store, reduxPersistor };
