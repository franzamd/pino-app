import {
  GET_BOOKINGS,
  GET_BOOKING,
  SET_LOADING_BOOKINGS,
  BOOKING_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        loading: false,
        error: null,
      };
    case GET_BOOKING:
      return {
        ...state,
        booking: action.payload,
        loading: false,
        error: null,
      };
    case SET_LOADING_BOOKINGS:
      return {
        ...state,
        loading: true,
      };
    case BOOKING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
