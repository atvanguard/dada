import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {
  products: {
    data: [],
    loading: false,
    success: false,
    request: false,
    error: false,
  }
};

const store = createStore(
  rootReducer, 
  initialState,
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  );

export default store;