import { 
  API_BUTTON_LOGIN, 
  API_BUTTON_LOGIN_SUCCESS, 
  API_BUTTON_LOGIN_ERROR 
} from './constants';
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "utils/localStorage";

export const initialState = {
  fetching: false,
  error: false,
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case API_BUTTON_LOGIN: 
      state.fetching = true;
        return {...state};
      case API_BUTTON_LOGIN_SUCCESS:
        console.log(action.payload);
        
        LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.JWT, action.payload.body.token.substring(7));
        LocalStorageUtils.setItem(LOCAL_STORAGE_KEY.USERNAME, action.payload.username);
        state.fetching = false;
        return {...state};
      case API_BUTTON_LOGIN_ERROR:
        state.fetching = false;
        state.error = true;
        return {...state};
      default: 
        return {...state};
    }
}

export default loginReducer;