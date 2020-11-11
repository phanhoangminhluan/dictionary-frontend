import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import * as constants from './constants';
import { get, post, put as putApi } from 'utils/request';
import { LEARN_A_FLASHCARD, REMEMBER_A_FLASHCARD, FORGET_A_FLASHCARD } from 'utils/apiEndpoint';

const learnAFlashCardAPI = (id) => {
  return post(
    `${LEARN_A_FLASHCARD}/${id}`
  )
}

const rememberAFlashCardAPI = (cardSetSessionId, cardId) => {
  return putApi(
    `${REMEMBER_A_FLASHCARD}/${cardId}`
  )
}

const forgetAFlashCardAPI = (cardSetSessionId, cardId) => {
  return putApi(
    `${FORGET_A_FLASHCARD}/${cardId}`
  )
}

function* learnAFlashCard(action) {
  try {
    const { id } = action.param;
    const res = yield call(learnAFlashCardAPI, id);
    yield put({ type: constants.API_LEARN_A_FLASHCARD_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: constants.API_LEARN_A_FLASHCARD_ERROR, payload: e.message });
  }
}

function* rememberAFlashCard(action) {
  try {
    const {cardSetSessionId, cardId} = action.param;
    const res = yield call(rememberAFlashCardAPI, cardSetSessionId, cardId);
    yield put({ type: constants.API_REMEMBER_A_WORD_SUCCESS, payload: res.data});
  } catch (error) {
    yield put({ type: constants.API_REMEMBER_A_WORD_ERROR, payload: error.message});
  }
}

function* forgetAFlashCard(action) {
  try {
    const {cardSetSessionId, cardId} = action.param;
    const res = yield call(forgetAFlashCardAPI, cardSetSessionId, cardId);
    yield put({ type: constants.API_FORGET_A_WORD_SUCCESS, payload: res.data});
  } catch (error) {
    yield put({ type: constants.API_FORGET_A_WORD_ERROR, payload: error.message});
  }
}

function* watchLearnAFlashCard() {
  yield takeEvery(constants.API_LEARN_A_FLASHCARD, learnAFlashCard);
}
function* watchRememberAFlashCard() {
  yield takeEvery(constants.API_REMEMBER_A_WORD, rememberAFlashCard);
}
function* watchForgetAFlashCard() {
  yield takeEvery(constants.API_FORGET_A_WORD, forgetAFlashCard);
}

export default function* () {
  yield all([
    fork(watchLearnAFlashCard), 
    fork(watchRememberAFlashCard),
    fork(watchForgetAFlashCard)
  ]);
}
