/* eslint-disable no-case-declarations */
import * as constants from './constants';
import * as _ from 'lodash/fp';
export const initialState = {
  listAllCardset: [],
  fetching: false,
  message: '',
  error: false,
}

export const createCardSet = (state = initialState, action) => {
  switch (action.type) {
    case constants.API_GET_ALL_MY_CARDSET:
    case constants.API_UPDATE_NAME_CARDSET:
      state.fetching = true;
      state.message = '';
      state.error = false;
      return { ...state };
    case constants.API_GET_ALL_MY_CARDSET_SUCCESS:
      state.fetching = false;
      state.message = 'Get list card set success';
      state.listAllCardset = action.payload.body;
      return { ...state };
    case constants.API_UPDATE_NAME_CARDSET_SUCCESS:
      const index = _.get('payload.index', action);
      const name = _.get('payload.name', action);
      const newList = _.set(`${index}.name`, name)(state.listAllCardset);

      state.fetching = false;
      state.message = 'Update name success';
      state.listAllCardset = newList;
      return { ...state };
    case constants.API_GET_ALL_MY_CARDSET_ERROR:
    case constants.API_UPDATE_NAME_CARDSET_ERROR:
      state.fetching = false;
      state.error = true;
      return { ...state };
    default:
      return { ...state };
  }
}

export default createCardSet;