import { 
  API_SEARCH_WORD_DETAIL,
  API_SEARCH_WORD_DETAIL_SUCCESS,
  API_SEARCH_WORD_DETAIL_ERROR,
  API_GET_WORD_SUGGESTION,
  API_GET_WORD_SUGGESTION_SUCCESS,
  API_GET_WORD_SUGGESTION_ERROR,
} from './constants';

export const initialState = {
  wordDetail: {},
  wordSuggestion: [],
  fetching: false,
  error: false,
}

export const dictionaryReducer = (state = initialState, action) => {
    switch (action.type) {
      case API_SEARCH_WORD_DETAIL: 
      case API_GET_WORD_SUGGESTION: 
        state.fetching = true;
        return {...state};
      case API_SEARCH_WORD_DETAIL_SUCCESS:
        state.wordDetail = action.payload.body
        state.fetching = false;
        return {...state};
      case API_GET_WORD_SUGGESTION_SUCCESS:
        state.wordSuggestion = action.payload.body
        state.fetching = false;
        return {...state};
      case API_SEARCH_WORD_DETAIL_ERROR:
      case API_GET_WORD_SUGGESTION_ERROR:
        state.fetching = false;
        state.error = true;
        return {...state};
      default: 
        return {...state};
    }
}

export default dictionaryReducer;