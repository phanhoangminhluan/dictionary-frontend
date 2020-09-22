import { API_BUTTON_REGISTER } from './constants';

export function register (username, email, password) {
  return {
    type: API_BUTTON_REGISTER,
    username, email, password
  }
}