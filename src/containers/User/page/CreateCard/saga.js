import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import { 
  API_ADD_MANY_CARD,
  API_ADD_MANY_CARD_SUCCESS,
  API_ADD_MANY_CARD_ERROR
} from './constants';
import { post } from 'utils/request';
import { ADD_MANY_CARD} from 'utils/apiEndpoint';

const addManyCardAPI = (list, name) => {
  return post(
    ADD_MANY_CARD,
    {
      "cards": list,
      "name": name
    },
    {},
    {}
  )
}

function* addManyCard(action) {
  try {
    const {list, name} = action.param;
    const res = yield call(addManyCardAPI, list, name);
    yield put({ type: API_ADD_MANY_CARD_SUCCESS, payload: res.data });
  } catch (e) {
    yield put({ type: API_ADD_MANY_CARD_ERROR, payload: e.message });
  }
}


function* watchAddManyCard() {
  yield takeEvery(API_ADD_MANY_CARD, addManyCard);
}

export default function* () {
  yield all([fork(watchAddManyCard)]);
}
