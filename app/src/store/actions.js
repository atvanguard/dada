import {
  LIST,
  importArt,
  importArtSuccess,
  submitBid,
  submitBidSuccess,
  getBids,
  getBidsSuccess } from './actionTypes';
import axios from 'axios';

/**
 * List to be return instead of the one going to be returned by the server
 */
import * as mockData from './mockData';
let MODE = ''
// MODE = 'MOCK'

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
      if (MODE === 'MOCK') {
        setTimeout(() => {
          dispatch(getListSuccess(mockData.ART_LIST))
        }, 500);
      } else {
        const res = await axios.get(URL);
        dispatch(getListSuccess(res.data));
      }
    } catch (errors) {
      dispatch(getListError(errors));
    }
  }
};

export const fetchCreatorArt = () => {
  const URL = '/account/me';
  return async dispatch => {
    try {
      dispatch(getList())
      if (MODE === 'MOCK') {
        setTimeout(() => {
          dispatch(getCreatorArtListSuccess(mockData.CREATOR_ART_LIST))
        }, 500);
      } else {
        const res = await axios.get(URL);
        dispatch(getCreatorArtListSuccess(res.data));
      }
    } catch (errors) {
      dispatch(getListError(errors));
    }
  }
};

export const fetchbids = () => {
  const URL = '/v2/orderbook';
  return async dispatch => {
    try {
      dispatch(getBids())
      if (MODE === 'MOCK') {
        setTimeout(() => {
          dispatch(getBidsSuccess(mockData.bids))
        }, 500);
      } else {
        const res = await axios.get(URL);
        dispatch(getBidsSuccess(res.data));
      }
    } catch (errors) {
      dispatch(getListError(errors));
    }
  }
};

export const importCreatorArt = () => {
  const URL = '/account/import';
  return async dispatch => {
    try {
      dispatch(importArt())
      if (MODE === 'MOCK') {
        setTimeout(() => {
          dispatch(importArtSuccess())
        }, 500);
      } else {
        await axios.post(URL);
        dispatch(importArtSuccess());
      }
    } catch (errors) {
      dispatch(getListError(errors));
    }
  }
};

export const submitArtBid = (bid) => {
  const URL = '/v2/order';
  return async dispatch => {
    try {
      dispatch(submitBid())
      if (MODE === 'MOCK') {
        setTimeout(() => {
          dispatch(submitBidSuccess())
        }, 500);
      } else {
        await axios.post(URL, {bid});
        dispatch(submitBidSuccess());
      }
    } catch (errors) {
      dispatch(getListError(errors));
    }
  }
};