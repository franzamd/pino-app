import React, {useReducer} from 'react';
import axios from 'axios';

import patientReducer from './patientReducer';
import PatientContext from './patientContext';

import {
  GET_PATIENT,
  SET_LOADING_PATIENT,
  PATIENT_ERROR,
  RESET_PATIENTS,
} from '../types';

const PatientState = (props) => {
  const initialState = {
    patient: {},
    loading: false,
    error: null,
    reports: null,
  };

  const [state, dispatch] = useReducer(patientReducer, initialState);

  // Fetch single patient
  const getPatient = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(`http://10.0.2.2:5000/api/patients/me/${id}`);

      dispatch({
        type: GET_PATIENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Create patient
  const createPatient = async (formData, navigation) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      let res = await axios.post(
        'http://10.0.2.2:5000/api/patients/',
        formData,
        config,
      );
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  // Update patient
  const updatePatient = async (formData, id, navigation) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      let res = await axios.put(
        `http://10.0.2.2:5000/api/patients/${id}`,
        formData,
        config,
      );
    } catch (err) {
      dispatch({
        type: PATIENT_ERROR,
        payload: err.response.data.error,
      });
    }
  };

  const setLoading = async (state) => {
    dispatch({
      type: SET_LOADING_PATIENT,
    });
  };

  // Reset Data
  const resetPatients = async () => {
    dispatch({
      type: RESET_PATIENTS,
    });
  };

  return (
    <PatientContext.Provider
      value={{
        loading: state.loading,
        patient: state.patient,
        error: state.error,
        errorImage: state.errorImage,
        reports: state.reports,
        getPatient,
        createPatient,
        updatePatient,
        setLoading,
        resetPatients,
      }}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientState;
