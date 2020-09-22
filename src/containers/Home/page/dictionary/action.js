import { API_SEARCH_WORD_DETAIL, API_GET_WORD_SUGGESTION } from './constants';

export function searchWord (word) {
  return {
    type: API_SEARCH_WORD_DETAIL,
    word
  }
}

export function getWordSuggestion(value) {
  return {
    type: API_GET_WORD_SUGGESTION,
    value
  }
}