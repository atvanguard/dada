import { LIST } from './actionTypes';

const rootReducer = (state, action) => {
  switch(action.type) {
    case LIST.LIST_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
        }
      }
    case LIST.IMPORT_ART:
      return {
        ...state,
        importArt: {loading: true}
      }
    case LIST.IMPORT_ART_SUCCESS:
      return {
        ...state,
        importArt: {success: true, loading: false}
      }
    case LIST.SUBMIT_BID:
    return {
      ...state,
      submitBid: {loading: true}
    }
    case LIST.SUBMIT_BID_SUCCESS:
      return {
        ...state,
        submitBid: {success: true, loading: false}
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
    case LIST.CREATOR_ART_LIST_SUCCESS:
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