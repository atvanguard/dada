import { LIST } from './constants';

const intialState = {
  products: {
    data: [],
    loading: false,
    success: false,
    request: false,
    error: false,
  }
};

const rootReducer = (state = intialState, action) => {
  switch(action.type) {
    case LIST.LIST_LOADING:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        }
      }
    default:
      return state
  }
}

export default rootReducer;