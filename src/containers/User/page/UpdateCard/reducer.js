import * as constants from './constants';
import * as _ from 'lodash/fp';

export const initialState = {
  idCard: '',
  nameCard: '',
  listCardSet: [],
  fetching: false,
  message: '',
  error: false,
}

export const createCardSet = (state = initialState, action) => {
  switch (action.type) {
    case constants.API_GET_CARD_SET:
    case constants.API_UPDATE_A_CARD:
    case constants.API_ADD_MORE_CARD:
      state.fetching = true;
      state.message = '';
      state.error = false;
      return { ...state };
    case constants.API_GET_CARD_SET_SUCCESS:
      state.listCardSet = _.get('cards', action.payload.body);
      state.idCard = _.get('id', action.payload.body);
      state.nameCard = _.get('name', action.payload.body);

      state.fetching = false;
      state.message = 'Add new success';
      return { ...state };
    case constants.API_UPDATE_A_CARD_SUCCESS:
      state.fetching = false;
      state.message = 'Update success';
      return { ...state };
    case constants.API_ADD_MORE_CARD_SUCCESS:
      state.fetching = false;
      state.message = 'Add mỏe success';
      return { ...state };
    case constants.API_GET_CARD_SET_ERROR:
    case constants.API_UPDATE_A_CARD_ERROR:
    case constants.API_ADD_MORE_CARD_ERROR:
      state.fetching = false;
      state.error = true;
      return { ...state };
    default:
      return { ...state };
  }
}

export default createCardSet;