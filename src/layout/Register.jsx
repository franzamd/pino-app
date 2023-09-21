import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Box, Button} from 'native-base';
import InputGroup from '../components/InputGroup';
import AuthContext from '../context/auth/authContext';
import TextErrorGlobal from '../components/TextErrorGlobal';

const Register = ({route, navigation}) => {
  const authContext = useContext(AuthContext);
  const {error, loading, register, clearErrors} = authContext;
  const [auth, setAuth] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  // Initials function
  useEffect(() => {
    clearErrors();
  }, []);

  // Unmout component
  useEffect(
    () => () => {
      // Clear errors auth state
      clearErrors();
    },
    [],
  );

  const handleInput = (value, name) => {
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    await register(auth);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box padding={5}>
        <Text style={styles.logo}>Centro Odontológico Pino</Text>
        <InputGroup
          error={error && error.username}
          label="Username"
          value={auth.username}
          handleInput={value => handleInput(value, 'username')}
        />
        <InputGroup
          error={error && error.email}
          label="Email"
          value={auth.email}
          handleInput={value => handleInput(value, 'email')}
        />
        <InputGroup
          secureTextEntry={true}
          error={error && error.password}
          label="Password"
          value={auth.password}
          handleInput={value => handleInput(value, 'password')}
        />
        <InputGroup
          secureTextEntry={true}
          value={auth.password2}
          label="Repetir Password"
          handleInput={value => handleInput(value, 'password2')}
        />
        <TextErrorGlobal error={error} />
        <View style={styles.sectionButtons}>
          <Button
            style={styles.registerBtn}
            onPress={onSubmit}
            disabled={loading}>
            <Text style={styles.registerBtnText}>
              {loading ? 'Cargando...' : 'REGISTRARSE'}
            </Text>
          </Button>
          <TouchableOpacity
            disabled={loading}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logintText}>Login</Text>
          </TouchableOpacity>
        </View>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: '#fb5b5a',
    marginBottom: 40,
  },
  sectionButtons: {
    alignItems: 'center',
  },
  registerBtn: {
    width: '80%',
    borderRadius: 25,
    backgroundColor: '#fb5b5a',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  registerBtnText: {
    color: 'white',
  },
  logintText: {
    color: 'black',
  },
});

export default Register;
