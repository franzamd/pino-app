import {
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  SET_LOADING_PROFILE,
  PROFILE_ERROR,
  CLEAR_ERRORS_PROFILE,
  CLEAR_ERROR_PHOTO,
  RESET_PROFILE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null,
      };
    case SET_LOADING_PROFILE:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ERROR_PHOTO:
      return {
        ...state,
        errorPhoto: null,
        loading: false,
      };
    case RESET_PROFILE:
      return {
        profile: null,
        error: null,
        errorPhoto: null,
        loading: false,
      };
    default:
      return state;
  }
};
