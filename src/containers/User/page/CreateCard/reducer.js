import * as constants from './constants';

export const initialState = {
  fetching: false,
  message: '',
  error: false,
}

export const createCardSet = (state = initialState, action) => {
  switch (action.type) {
    case constants.API_ADD_MANY_CARD:
      state.fetching = true;
      state.message = '';
      state.error = false;
      return { ...state };
    case constants.API_ADD_MANY_CARD_SUCCESS:
      state.fetching = false;
      state.message = 'Add new success';
      return { ...state };
    case constants.API_ADD_MANY_CARD_ERROR:
      state.fetching = false;
      state.error = true;
      return { ...state };
    default:
      return { ...state };
  }
}

export default createCardSet;