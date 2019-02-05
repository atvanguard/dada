import { LIST } from './constants';

const initialState = {
  products: {
    data: [],
    loading: false,
    success: false,
    request: false,
    error: false,
  }
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case LIST.LIST_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        }
      }
    case LIST.LIST_SUCCESS:
      return {
        ...state,
        products: {
          ...state.products,
          data: action.data,
          loading: false,
          error: false,
          success: true,
      }
    }
    case LIST.LIST_ERROR: 
      return {
        ...state,
        products: {
          ...state.products,
          error: action.error,
          success: false,
        }
      }
    default:
      return state
  }
}

export default rootReducer;