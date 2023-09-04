import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducers';

// Custom serialize function
const serialize = (data) => {
  // Handle special cases like '0'
  if (typeof data === 'number' && data === 0) {
    return '0';
  }

  return JSON.stringify(data);
};

// Custom deserialize function
const deserialize = (serializedData) => {
  // Handle special cases like '0'
  if (serializedData === '0') {
    return 0;
  }

  return JSON.parse(serializedData);
};

// Redux Persist configuration
const persistConfig = {
  key: 'delivery',
  storage,
  serialize,
  deserialize,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const persistor = persistStore(store);

export {
  store,
  persistor,
};
