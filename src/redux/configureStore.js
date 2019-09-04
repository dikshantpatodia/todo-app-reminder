import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducers';

const actionStateInjectorMiddleware = (store) => (next) => (action) => {
  next({ ...action, getState: store.getState });
};

export default function configureStore() {
  const middlewares = [];
  middlewares.push(actionStateInjectorMiddleware);
  const store = createStore(reducer, applyMiddleware(...middlewares));

  return {
    ...store,
  };
}
