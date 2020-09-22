import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import { 
  API_GET_ALL_MY_CARDSET,
  API_GET_ALL_MY_CARDSET_SUCCESS,
  API_GET_ALL_MY_CARDSET_ERROR,
  API_UPDATE_NAME_CARDSET,
  API_UPDATE_NAME_CARDSET_SUCCESS,
  API_UPDATE_NAME_CARDSET_ERROR
} from './constants';
import { get, put as putApi } from 'utils/request';
import { GET_MY_CARDSET, UPDATE_NAME_CARD } from 'utils/apiEndpoint';

const getAllMyCardsetAPI = () => {
  return get(
    GET_MY_CARDSET,
    {},
    {},
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

function* getAllMyCardset(action) {
  try {
    const res = yield call(getAllMyCardsetAPI);
    yield put({ type: API_GET_ALL_MY_CARDSET_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: API_GET_ALL_MY_CARDSET_ERROR, payload: e.message });
  }
}

function* updateNameCardSet(action) {
  try {
    const {id, name, index } = action.param;
    const res = yield call(updateNameCardSetAPI, id, name);
    res.data.index = index;
    res.data.name = name;
    yield put({ type: API_UPDATE_NAME_CARDSET_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: API_UPDATE_NAME_CARDSET_ERROR, payload: e.message });
  }
}


function* watchGetAllMyCardset() {
  yield takeEvery(API_GET_ALL_MY_CARDSET, getAllMyCardset);
}

function* watchUpdateNameCardSet() {
  yield takeEvery(API_UPDATE_NAME_CARDSET, updateNameCardSet);
}

export default function* () {
  yield all([fork(watchGetAllMyCardset), fork(watchUpdateNameCardSet)]);
}
