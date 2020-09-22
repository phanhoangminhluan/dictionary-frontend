import * as constants from './constants';
import * as _ from 'lodash/fp';

export const initialState = {
  cardSetSessionId: '',
  cardSetId: '',
  studiableCards: [],
  fetching: false,
  message: '',
  error: false,
}

export const createCardSet = (state = initialState, action) => {
  switch (action.type) {
    case constants.API_LEARN_A_FLASHCARD:
    case constants.API_REMEMBER_A_WORD:
    case constants.API_FORGET_A_WORD:
      state.fetching = true;
      state.message = '';
      state.error = false;
      return { ...state };
    case constants.API_LEARN_A_FLASHCARD_SUCCESS:
      state.studiableCards = _.get('studiableCards', action.payload.body);
      state.cardSetSessionId = _.get('cardSetSessionId', action.payload.body);
      state.cardSetId = _.get('cardSetId', action.payload.body);

      state.fetching = false;
      state.message = 'Ready to learn';
      return { ...state };
    case constants.API_REMEMBER_A_WORD_SUCCESS:
    case constants.API_FORGET_A_WORD_SUCCESS:
      state.fetching = false;
      state.message = 'Update success';
      return { ...state };
    case constants.API_LEARN_A_FLASHCARD_ERROR:
    case constants.API_FORGET_A_WORD_ERROR:
    case constants.API_REMEMBER_A_WORD_ERROR:
      state.fetching = false;
      state.error = true;
      return { ...state };
    default:
      return { ...state };
  }
}

export default createCardSet;