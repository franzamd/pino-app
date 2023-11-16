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
import TextErrorGlobal from '../components/TextErrorGlobal';
import AuthContext from '../context/auth/authContext';

const Login = ({route, navigation}) => {
  const authContext = useContext(AuthContext);
  const {error, loading, login, clearErrors} = authContext;

  const [auth, setAuth] = useState({
    email: '',
    password: '',
  });

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
    await login(auth);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box padding={5}>
        <Text style={styles.logo}>Centro Odontológico Pino</Text>
        <InputGroup
          error={error && error.email}
          label="Email"
          value={auth.email}
          handleInput={value => handleInput(value, 'email')}
        />
        <InputGroup
          error={error && error.password}
          label="Password"
          value={auth.password}
          secureTextEntry={true}
          handleInput={value => handleInput(value, 'password')}
        />
        <TextErrorGlobal error={error} />
        <View style={styles.sectionButtons}>
          <Button style={styles.loginBtn} onPress={onSubmit} disabled={loading}>
            <Text style={styles.loginBtnText}>
              {loading ? 'Cargando...' : 'LOGIN'}
            </Text>
          </Button>
          <TouchableOpacity
            disabled={loading}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.registerText}>Registrarse</Text>
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
    color: '#52B0EA',
    marginBottom: 40,
  },
  sectionButtons: {
    alignItems: 'center',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    backgroundColor: '#52B0EA',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginBtnText: {
    color: 'white',
  },
  registerText: {
    color: 'black',
  },
});

export default Login;
