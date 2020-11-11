import {
  API_BUTTON_REGISTER,
  API_BUTTON_REGISTER_SUCCESS,
  API_BUTTON_REGISTER_ERROR
} from './constants';

export const initialState = {
  fetching: false,
  error: false,
}

export const registerReducer = (state = initialState, action) => {
  console.log(action.type
    );
  
  switch (action.type) {
    case API_BUTTON_REGISTER:
      state.fetching = true;
      return { ...state };
    case API_BUTTON_REGISTER_SUCCESS:
      state.fetching = false;
      return { ...state };
    case API_BUTTON_REGISTER_ERROR:
      state.fetching = false;
      state.error = true;
      return { ...state };
    default:
      return { ...state };
  }
}

export default registerReducer;