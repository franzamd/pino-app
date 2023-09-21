import {
  GET_PATIENT,
  SET_LOADING_PATIENT,
  PATIENT_ERROR,
  RESET_PATIENTS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PATIENT:
      return {
        ...state,
        patient: action.payload,
        loading: false,
        error: null,
      };
    case SET_LOADING_PATIENT:
      return {
        ...state,
        loading: action.payload,
      };
    case PATIENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_PATIENTS:
      return {
        patient: {},
        loading: false,
        error: null,
        reports: null,
      };
    default:
      return state;
  }
};
