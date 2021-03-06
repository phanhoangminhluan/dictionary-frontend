import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import {
  API_GET_CARD_SET,
  API_GET_CARD_SET_SUCCESS,
  API_GET_CARD_SET_ERROR,
  API_ADD_MORE_CARD,
  API_ADD_MORE_CARD_SUCCESS,
  API_ADD_MORE_CARD_ERROR,
  API_UPDATE_A_CARD,
  API_UPDATE_A_CARD_SUCCESS,
  API_UPDATE_A_CARD_ERROR,
  API_DELETE_A_CARD,
  API_DELETE_A_CARD_SUCCESS,
  API_DELETE_A_CARD_ERROR,
  API_UPDATE_NAME_CARDSET,
  API_UPDATE_NAME_CARDSET_SUCCESS,
  API_UPDATE_NAME_CARDSET_ERROR,
} from './constants';
import { get, post, put as putApi, remove } from 'utils/request';
import { GET_MY_CARDSET, ADD_MORE_CARD, UPDATE_A_CARD, UPDATE_NAME_CARD } from 'utils/apiEndpoint';

const getOneCardSetAPI = (id) => {
  return get(
    `${GET_MY_CARDSET}/${id}`,
    {},
    {},
    {}
  )
}

const addMoreCardAPI = (id, list) => {
  return post(
    `${ADD_MORE_CARD}`,
    {
      cardSetId: id,
      cards: list
    }
  )
}

const updateACardAPI = (cardSetId, definition, id, term ) => {
  return putApi(
    `${UPDATE_A_CARD}`,
    {
      cardSetId, definition, id, term 
    }
  )
}

const deleteACardAPI = ( id ) => {
  return remove(
    `${UPDATE_A_CARD}/${id}`,
    {}
  )
}


const updateNameCardSetAPI = (id, name) => {
  return putApi(
    UPDATE_NAME_CARD,
    {
      "id": id,
      "name": name
    },
    {},
    {}
  )
}

function* getOneCardSet(action) {
  try {
    const { id } = action.param;
    const res = yield call(getOneCardSetAPI, id);
    yield put({ type: API_GET_CARD_SET_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: API_GET_CARD_SET_ERROR, payload: e.message });
  }
}

function* addMoreCard(action) {
  try {
    const {id, list} = action.param;
    const res = yield call(addMoreCardAPI, id, list);
    yield put({ type: API_ADD_MORE_CARD_SUCCESS, payload: res.data});
  } catch (error) {
    yield put({ type: API_ADD_MORE_CARD_ERROR, payload: error.message});
  }
}

function* updateACard(action) {
  try {
    const {cardSetId, definition, id, term} = action.param;
    const res = yield call(updateACardAPI, cardSetId, definition, id, term);
    yield put({ type: API_UPDATE_A_CARD_SUCCESS, payload: res.data});
  } catch (error) {
    yield put({ type: API_UPDATE_A_CARD_ERROR, payload: error.message});
  }
}

function* deleteACard(action) {
  try {
    const { id } = action.param;
    const res = yield call(deleteACardAPI, id );
    yield put({ type: API_DELETE_A_CARD_SUCCESS, payload: id});
  } catch (error) {
    yield put({ type: API_DELETE_A_CARD_ERROR, payload: error.message});
  }
}

function* updateNameCardSet(action) {
  try {
    const {id, name } = action.param;
    const res = yield call(updateNameCardSetAPI, id, name);
    res.data.name = name;
    yield put({ type: API_UPDATE_NAME_CARDSET_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: API_UPDATE_NAME_CARDSET_ERROR, payload: e.message });
  }
}

function* watchGetOneCardSet() {
  yield takeEvery(API_GET_CARD_SET, getOneCardSet);
}
function* watchAddMoreCard() {
  yield takeEvery(API_ADD_MORE_CARD, addMoreCard);
}
function* watchUpdateACard() {
  yield takeEvery(API_UPDATE_A_CARD, updateACard);
}
function* watchDeleteACard() {
  yield takeEvery(API_DELETE_A_CARD, deleteACard);
}
function* watchUpdateNameCardSet() {
  yield takeEvery(API_UPDATE_NAME_CARDSET, updateNameCardSet);
}

export default function* () {
  yield all([
    fork(watchGetOneCardSet), 
    fork(watchAddMoreCard),
    fork(watchUpdateACard),
    fork(watchDeleteACard),
    fork(watchUpdateNameCardSet)
  ]);
}
