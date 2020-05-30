import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import createRootReducer from './root-reducer';
import sagas from './root-saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
  ];

  const instance = createStore(
    createRootReducer(),
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  sagaMiddleware.run(sagas);

  return instance;
};

export type State = ReturnType<typeof store.getState>;

const store = configureStore();

export default store;
