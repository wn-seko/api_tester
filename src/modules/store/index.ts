import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import rootReducer from '../index'
import history from './history'

const __PRODUCTION__ = process.env.NODE_ENV === 'production'

const composeEnhancers = composeWithDevTools({})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['request']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (initialState: object = {}) => {
  const router = routerMiddleware(history)

  const middlewares = [thunk, router]
  if (!__PRODUCTION__) {
    const logger = require('redux-logger').default
    middlewares.push(logger)
  }
  // tslint:disable-next-line:no-shadowed-variable
  const store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)))
  return store
}

export const store = configureStore()
export const persistor = persistStore(store)
export default configureStore
