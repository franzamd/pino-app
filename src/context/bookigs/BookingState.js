import React, {useReducer} from 'react';
import axios from 'axios';
import BookingContext from './bookingContext';
import bookingReducer from './bookingReducer';

import {
  GET_BOOKINGS,
  SET_LOADING_BOOKINGS,
  BOOKING_ERROR,
  GET_BOOKING,
} from '../types';

const BookingState = (props) => {
  const initialState = {
    bookings: [],
    booking: {},
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Fetch all bookings
  const getBookings = async () => {
    try {
      setLoading();

      const res = await axios.get(`http://10.0.2.2:5000/api/bookings`);

      dispatch({
        type: GET_BOOKINGS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOOKING_ERROR,
        payload: err.response.data.error,
      });
    }
  };
  // Fetch booking
  const getBooking = async (id) => {
    try {
      setLoading();

      const res = await axios.get(`http://10.0.2.2:5000/api/bookings/${id}`);

      dispatch({
        type: GET_BOOKING,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: BOOKING_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Select consultation of the booking for user
  const selectConsultation = async (idBooking, formData, navigation) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.post(
        `http://10.0.2.2:5000/api/bookings/${idBooking}/consultations`,
        formData,
        config,
      );

      // const popAction = StackActions.pop(1);

      // navigation.dispatch(StackActions.popToTop());
      navigation.navigate('Bookings');
      getBookings();
    } catch (err) {
      dispatch({
        type: BOOKING_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Delete consultation of the booking
  const deleteConsultation = async (id, idConsultation, navigation) => {
    try {
      await axios.delete(
        `http://10.0.2.2:5000/api/bookings/${id}/consultations/${idConsultation}`,
      );

      navigation.goBack();
      getBookings();
    } catch (err) {
      dispatch({
        type: BOOKING_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Set loading
  const setLoading = async () => {
    dispatch({
      type: SET_LOADING_BOOKINGS,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookings: state.bookings,
        booking: state.booking,
        error: state.error,
        loading: state.loading,
        getBookings,
        getBooking,
        selectConsultation,
        deleteConsultation,
      }}>
      {props.children}
    </BookingContext.Provider>
  );
};

export default BookingState;
