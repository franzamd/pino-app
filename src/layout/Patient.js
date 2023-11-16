import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Container, Content, Form } from 'native-base';
import InputGroup from '../components/InputGroup';
import SelectInputGroup from '../components/SelectInputGroup';
import DateInputGroup from '../components/DateInputGroup';
import PatientContext from '../context/patient/patientContext';
import AuthContext from '../context/auth/authContext';

const Patient = ({ navigation }) => {
  const patientContext = useContext(PatientContext);
  const authContext = useContext(AuthContext);
  const {
    error,
    loading,
    getPatient,
    // createPatient,
    // updatePatient,
    patient: patientUser,
  } = patientContext;
  const { user } = authContext;
  const [patient, setPatient] = useState({
    id: '',
    name: '',
    lastname: '',
    ci: '',
    phone: '',
    age: '',
    gender: '',
    placeBirth: '',
    job: '',
    date: new Date(),
    address: '',
    degreeInstruction: '',
    civilStatus: '',
    nativeNation: '',
    language: '',
  });
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isModeUpdate, setIsModeUpdate] = useState(false);

  useEffect(() => {
    if (user && user.data) getPatient(user.data._id);
  }, []);

  useEffect(() => {
    if (!loading && patientUser && patientUser.data) {
      setPatient({
        ...patient,
        id: patientUser.data._id ? patientUser.data._id : null,
        name: patientUser.data.name ? patientUser.data.name : '',
        lastname: patientUser.data.lastname ? patientUser.data.lastname : '',
        ci: patientUser.data.ci ? patientUser.data.ci : '',
        phone: patientUser.data.phone ? patientUser.data.phone : '',
        age: patientUser.data.age ? patientUser.data.age : '',
        gender: patientUser.data.gender ? patientUser.data.gender : '',
        placeBirth: patientUser.data.placeBirth
          ? patientUser.data.placeBirth
          : '',
        date: patientUser.data.date ? patientUser.data.date : '',
        job: patientUser.data.job ? patientUser.data.job : '',
        address: patientUser.data.address ? patientUser.data.address : '',
        degreeInstruction: patientUser.data.degreeInstruction
          ? patientUser.data.degreeInstruction
          : '',
        civilStatus: patientUser.data.civilStatus
          ? patientUser.data.civilStatus
          : '',
        nativeNation: patientUser.data.nativeNation
          ? patientUser.data.nativeNation
          : '',
        language: patientUser.data.language ? patientUser.data.language : '',
      });
      setIsModeUpdate(true);
    }
  }, [loading]);

  const handleInput = (value, name) => {
    setPatient({
      ...patient,
      [name]: value,
    });
  };

  const handleInputDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setPatient({ ...patient, date: currentDate });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSubmit = async () => {
    const formData = {
      name: patient.name,
      lastname: patient.lastname,
      ci: patient.ci,
      phone: patient.phone,
      age: patient.age,
      gender: patient.gender,
      degreeInstruction: patient.degreeInstruction,
      placeBirth: patient.placeBirth,
      date: patient.date,
      job: patient.job,
      address: patient.address,
      civilStatus: patient.civilStatus,
      nativeNation: patient.nativeNation,
      language: patient.language,
    };

    if (isModeUpdate) {
      // Update patient existing
      // await updateProfile(formData, navigation);
    } else {
      // Create a new patient
      // await createProfile(formData, data, navigation);
    }
  };

  // Options
  const optionsGender = [
    { _id: '1', label: '* Seleccione una opción', value: 0 },
    { _id: '2', label: 'Masculino', value: 'Masculino' },
    { _id: '3', label: 'Femenino', value: 'Femenino' },
  ];

  const optionsDegreeInstruction = [
    { _id: '1', label: '* Seleccione una opción', value: 0 },
    { _id: '2', label: 'Inicial', value: 'Inicial' },
    { _id: '3', label: 'Primaria', value: 'Primaria' },
    { _id: '4', label: 'Secundaria', value: 'Secundaria' },
    { _id: '5', label: 'Universitaria', value: 'Universitaria' },
    { _id: '6', label: 'Técnico', value: 'Tecnico' },
    { _id: '7', label: 'Profesional', value: 'Profesional' },
  ];

  const optionsCivilStatus = [
    { _id: '1', label: '* Seleccione una opción', value: 0 },
    { _id: '2', label: 'Soltero(a)', value: 'Soltero(a)' },
    { _id: '3', label: 'Casado(a)', value: 'Casado(a)' },
    { _id: '4', label: 'Divorciado(a)', value: 'Divorciado(a)' },
    { _id: '5', label: 'Viudo(a)', value: 'Viudo(a)' },
    { _id: '6', label: 'Union Libre', value: 'Union-libre' },
  ];

  const optionsLanguage = [
    { _id: '1', label: '* Seleccione una opción', value: 0 },
    { _id: '2', label: 'Español', value: 'Español' },
    { _id: '3', label: 'Ingles', value: 'Ingles' },
    { _id: '4', label: 'Guaraní', value: 'Guarani' },
    { _id: '5', label: 'Quechua', value: 'Quechua' },
    { _id: '6', label: 'Aymara', value: 'Aymara' },
  ];

  return (
    <Container>
      <Text style={styles.logo}>Mis Datos de Paciente</Text>
      {/* Information section */}
      <Content>
        <Form>
          <InputGroup
            error={error && error.ci}
            label="C.I."
            value={patient.ci}
            handleInput={(value) => handleInput(value, 'ci')}
          />
          <InputGroup
            error={error && error.name}
            label="Nombres"
            value={patient.name}
            handleInput={(value) => handleInput(value, 'name')}
          />
          <InputGroup
            error={error && error.lastname}
            label="Apellidos"
            value={patient.lastname}
            handleInput={(value) => handleInput(value, 'lastname')}
          />
          <InputGroup
            error={error && error.age}
            label="Edad"
            value={patient.age}
            handleInput={(value) => handleInput(value, 'age')}
          />
          <SelectInputGroup
            error={error && error.gender}
            label="Sexo"
            options={optionsGender}
            value={patient.gender}
            handleInput={(value) => handleInput(value, 'gender')}
          />
          <InputGroup
            error={error && error.placeBirth}
            label="Lugar de Nacimiento"
            value={patient.placeBirth}
            handleInput={(value) => handleInput(value, 'placeBirth')}
          />
          <DateInputGroup
            error={error && error.date}
            label="Fecha de Nacimiento"
            value={patient.date}
            show={show}
            mode={mode}
            onPressBtn={showDatepicker}
            handleInput={(e, selectedData) =>
              handleInputDate(e, selectedData, 'date')
            }
          />
          <InputGroup
            error={error && error.job}
            label="Ocupación"
            value={patient.job}
            handleInput={(value) => handleInput(value, 'job')}
          />
          <InputGroup
            error={error && error.address}
            label="Dirección"
            value={patient.address}
            handleInput={(value) => handleInput(value, 'address')}
          />
          <InputGroup
            error={error && error.phone}
            label="Teléfono"
            value={patient.phone}
            handleInput={(value) => handleInput(value, 'phone')}
          />
          <SelectInputGroup
            error={error && error.degreeInstruction}
            label="Instrucción"
            options={optionsDegreeInstruction}
            value={patient.degreeInstruction}
            handleInput={(value) => handleInput(value, 'degreeInstruction')}
          />
          <SelectInputGroup
            error={error && error.civilStatus}
            label="Estado Civil"
            options={optionsCivilStatus}
            value={patient.civilStatus}
            handleInput={(value) => handleInput(value, 'civilStatus')}
          />
          <InputGroup
            error={error && error.nativeNation}
            label="Naciones Originarias"
            value={patient.nativeNation}
            handleInput={(value) => handleInput(value, 'nativeNation')}
          />
          <SelectInputGroup
            error={error && error.language}
            label="Idiomas o Dialecto"
            options={optionsLanguage}
            value={patient.language}
            handleInput={(value) => handleInput(value, 'language')}
          />
          <View style={styles.buttonsBox}>
            <Button
              style={styles.submitBtn}
              onPress={onSubmit}
              disabled={loading}>
              <Text style={styles.textBtnSubmit}>ACEPTAR</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    color: '#52B0EA',
    marginBottom: 20,
  },
  buttonsBox: {
    marginVertical: 40,
  },
  textBtnSubmit: {
    color: 'white',
  },
  submitBtn: {
    alignSelf: 'center',
    width: '30%',
    justifyContent: 'center',
  },
});

export default Patient;
