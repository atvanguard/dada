import { LIST } from './constants';
import axios from 'axios';

/**
 * List to be return instead of the one going to be returned by the server
 */
import * as mockData from './mockData';

const getList = () => ({
  type: LIST.LIST_REQUEST
});

const getListSuccess = data => ({
  type: LIST.LIST_SUCCESS,
  data,
});

const getCreatorArtListSuccess = data => ({
  type: LIST.CREATOR_ART_LIST_SUCCESS,
  data,
});

const getListError = error => ({
  type: LIST.LIST_ERROR,
  error,
});

export const fetchProducts = () => {
  const URL = '/public/listing';

  return async dispatch => {

    try {
      dispatch(getList())
      // Delete the below line on real server calls
      // setTimeout(() => {
      //   dispatch(getListSuccess(mockData.ART_LIST))
      // },500);
      /**
       * Uncomment to send back real data
       */
      const res = await axios.get(URL);
      dispatch(getListSuccess(res.data));

    }catch (errors) {
      dispatch(getListError(errors));
    }
  }
};

export const fetchCreatorArt = () => {
  const URL = '/account/me';

  return async dispatch => {

    try {
      dispatch(getList())
      // Delete the below line on real server calls
      // setTimeout(() => {
      //   dispatch(getCreatorArtListSuccess(mockData.CREATOR_ART_LIST))
      // },500);
      /**
       * Uncomment to send back real data
       */
      const res = await axios.get(URL);
      dispatch(getCreatorArtListSuccess(res.data));

    }catch (errors) {
      dispatch(getListError(errors));
    }
  }
};