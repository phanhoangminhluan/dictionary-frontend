import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BUTTON_REGISTER, API_BUTTON_REGISTER_SUCCESS, API_BUTTON_REGISTER_ERROR } from './constants';
import { post } from 'utils/request';
import { REGISTER_ACCOUNT } from "utils/apiEndpoint";

const getDataFromAPI = (username, email, password) => {
  return post(
    REGISTER_ACCOUNT,
    {
      "username": username,
      "email": email,
      "password": password,
      "roleId": 0
    },
    {},
    {}
  )
}

export function* apiSideEffect({username, email, password}) {
  try {
    const res = yield call(getDataFromAPI, username, email, password);
    yield put({ type: API_BUTTON_REGISTER_SUCCESS, payload: res.data });
  } catch (e) {    
    yield put({ type: API_BUTTON_REGISTER_ERROR, payload: e.message });
  }
}

export default function* apiSaga() {
  yield takeEvery(API_BUTTON_REGISTER, apiSideEffect);
}
