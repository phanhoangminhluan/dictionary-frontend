import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BUTTON_LOGIN, API_BUTTON_LOGIN_SUCCESS, API_BUTTON_LOGIN_ERROR } from './constants';
import { post } from 'utils/request';
import { AUTH__LOGIN } from "utils/apiEndpoint";

const getDataFromAPI = (username, password) => {
  return post(
    AUTH__LOGIN,
    {
      "username": username,
      "password": password
    },
    {},
    {}
  )
}

export function* apiSideEffect({username, password}) {
  try {
    const res = yield call(getDataFromAPI, username, password);
    yield put({ type: API_BUTTON_LOGIN_SUCCESS, payload: {body: res.data.body, username} });
  } catch (e) {
    console.log(e);
    
    yield put({ type: API_BUTTON_LOGIN_ERROR, payload: e.message });
  }
}

export default function* apiSaga() {
  yield takeEvery(API_BUTTON_LOGIN, apiSideEffect);
}
