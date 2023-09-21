import React, { useReducer } from 'react';
import axios from 'axios';
import { API_URL } from '@env';

import ProfileContext from './profileContext';
import profileReducer from './profileReducer';

import {
  GET_PROFILE,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR_PHOTO,
  PROFILE_ERROR,
  CLEAR_ERROR_PHOTO,
  SET_LOADING_PROFILE,
  RESET_PROFILE,
} from '../types';

const ProfileState = (props) => {
  const initialState = {
    profile: null,
    error: null,
    errorPhoto: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Get profile me
  const getProfileMe = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/profiles/me`);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: error.response?.data?.error,
      });
    }
  };

  // Create profile me
  const createProfileMe = async (formData, navigation) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/api/profiles/me`,
        formData,
        config,
      );

      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
      });

      await getProfileMe();
      navigation.navigate('Home');
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: error.response?.data?.error,
      });
    }
  };

  // Update profile me
  const updateProfileMe = async (formData, navigation) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `${API_URL}/api/profiles/me`,
        formData,
        config,
      );

      // await uploadImageMe(file);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      await getProfileMe();
      navigation.navigate('Home');
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: error.response?.data?.error,
      });
    }
  };

  // // Upload photo for me
  // const uploadImageMe = async (formData) => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   try {
  //     setLoading(true);

  //     console.log(formData);
  //     let form = new FormData();
  //     form.append('file', {
  //       uri:
  //         Platform.OS === 'android'
  //           ? formData
  //           : formData.replace('file://', ''),
  //       name: 'image.jpg',
  //       type: 'image/jpg',
  //     });

  //     console.log(form);

  //     const res = await axios.post(
  //       'http://10.0.2.2:5000/api/profiles/me/photo',
  //       form,
  //       config,
  //     );

  //     // console.log(res);

  //     // clearErrorsPhoto();
  //   } catch (err) {
  //     console.log('error', err);
  //     // dispatch({
  //     //   type: PROFILE_ERROR_PHOTO,
  //     //   payload: err.response.data.error,
  //     // });
  //   }
  //   //  }
  // };

  // Set loading
  const setLoading = (state) => {
    dispatch({
      type: SET_LOADING_PROFILE,
      payload: state,
    });
  };

  // Clear errors photo profile
  const clearErrorsPhoto = async () => {
    dispatch({
      type: CLEAR_ERROR_PHOTO,
    });
  };

  const resetProfile = async () => {
    dispatch({
      type: RESET_PROFILE,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        error: state.error,
        loading: state.loading,
        createProfileMe,
        updateProfileMe,
        getProfileMe,
        resetProfile,
      }}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
