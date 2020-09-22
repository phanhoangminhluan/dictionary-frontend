import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import { 
  API_SEARCH_WORD_DETAIL, 
  API_SEARCH_WORD_DETAIL_SUCCESS, 
  API_SEARCH_WORD_DETAIL_ERROR, 
  API_GET_WORD_SUGGESTION,
  API_GET_WORD_SUGGESTION_SUCCESS,
  API_GET_WORD_SUGGESTION_ERROR
} from './constants';
import { get } from 'utils/request';
import { GET_WORD_DETAIL, GET_WORD_SUGGESTION } from 'utils/apiEndpoint';

const getWordDetailAPI = (word) => {
  return get(
    `${GET_WORD_DETAIL}/${word}`,
    {},
    {},
    {}
  )
}

const getWordSuggestionAPI = (value) => {
  return get(`${GET_WORD_SUGGESTION}/${value}`,
    {},
    {},
    {}
  )
}

function* searchWordDetail({ word }) {
  try {
    const res = yield call(getWordDetailAPI, word);
    yield put({ type: API_SEARCH_WORD_DETAIL_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: API_SEARCH_WORD_DETAIL_ERROR, payload: e.message });
  }
}

function* getWordSuggestion ({value}) {
  try {
    const res = yield call(getWordSuggestionAPI, value);
    yield put({type: API_GET_WORD_SUGGESTION_SUCCESS, payload: res.data});
  } catch (e) {
    yield put({ type: API_GET_WORD_SUGGESTION_ERROR, payload: e})
  }
}

function* watchSearchWordDetail() {
  yield takeEvery(API_SEARCH_WORD_DETAIL, searchWordDetail);
}

function* watchGetWordSuggestion() {
  yield takeEvery(API_GET_WORD_SUGGESTION, getWordSuggestion);
}

export default function* () {
  yield all([fork(watchSearchWordDetail), fork(watchGetWordSuggestion)]);
}
