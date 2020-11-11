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
    case constants.API_DELETE_A_CARD:
    case constants.API_UPDATE_NAME_CARDSET:
      state.fetching = true;
      state.message = '';
      state.error = false;
      return { ...state };
    case constants.API_GET_CARD_SET_SUCCESS:
      state.listCardSet = _.get('cards', action.payload.body);
      state.idCard = _.get('id', action.payload.body);
      state.nameCard = _.get('name', action.payload.body);

      state.fetching = false;
      state.message = '';
      return { ...state };
    case constants.API_UPDATE_A_CARD_SUCCESS:
      state.fetching = false;
      state.message = 'Update success';
      return { ...state };
    case constants.API_ADD_MORE_CARD_SUCCESS:
      state.fetching = false;
      // state.message = 'Add more success';
      return { ...state };
    case constants.API_DELETE_A_CARD_SUCCESS:
      state.listCardSet = state.listCardSet.filter(item => item.id !== action.payload)
      state.fetching = false;
      state.message = 'Update success';
      return { ...state };
    case constants.API_UPDATE_NAME_CARDSET_SUCCESS:
      state.nameCard = _.get('name', action.payload);

      state.fetching = false;
      state.message = '';
      return { ...state };
    case constants.API_GET_CARD_SET_ERROR:
    case constants.API_UPDATE_A_CARD_ERROR:
    case constants.API_ADD_MORE_CARD_ERROR:
    case constants.API_DELETE_A_CARD_ERROR:
    case constants.API_UPDATE_NAME_CARDSET_ERROR:
      state.fetching = false;
      state.error = true;
      return { ...state };
    default:
      return { ...state };
  }
}

export default createCardSet;