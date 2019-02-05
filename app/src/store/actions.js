import { LIST } from './constants';
import axios from 'axios';

/**
 * List to be return instead of the one going to be returned by the server
 */
import data from './mockData';

const getList = () => ({
  type: LIST.LIST_REQUEST
});

const getListSuccess = data => ({
  type: LIST.LIST_SUCCESS,
  data,
});

const getListError = error => ({
  type: LIST.LIST_ERROR,
  error,
});

export const fetchProducts = () => {
  const URL = '/listing';

  return async dispatch => {

    try {
      dispatch(getList())
      // Delete the below line on real server calls
      setTimeout(() => {
        dispatch(getListSuccess(data))
      },5000);
      /**
       * Uncomment to send back real data
       */
      // const res = await axios.get(URL);
      // dispatch(getListSuccess(res.data));

    }catch (errors) {
      dispatch(getListError(errors));
    }
  }
};