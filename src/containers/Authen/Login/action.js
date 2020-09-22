import { API_BUTTON_LOGIN } from './constants';

export function login (username, password) {
  return {
    type: API_BUTTON_LOGIN,
    username, password
  }
}