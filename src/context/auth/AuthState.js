import React, { useReducer } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import authReducer from './authReducer';
import AuthContext from './authContext';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
} from '../types';

const cookie = new Cookies();

const AuthState = (props) => {
  const initialState = {
    token: cookie.get('token'),
    isAuthenticated: null,
    user: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login user
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'http://10.0.2.2:5000/api/auth/login',
        formData,
        config,
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  // Register user
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        'http://10.0.2.2:5000/api/auth/register',
        formData,
        config,
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  // Load user
  const loadUser = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:5000/api/auth/me');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.get('http://10.0.2.2:5000/api/auth/logout');

      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      dispatch({
        type: LOGOUT,
        payload: error.response.data.error,
      });
    }
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        loading: state.loading,
        login,
        register,
        loadUser,
        clearErrors,
        logout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
