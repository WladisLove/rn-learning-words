import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import vocabulariesReducer from './vocabulary';
import orientationReducer from './orientation';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    vocStore: vocabulariesReducer,
    orientStore: orientationReducer,
  }),
);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
