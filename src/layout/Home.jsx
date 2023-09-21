import React, {useEffect, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Container, View, Text, Button} from 'native-base';
import AuthContext from '../context/auth/authContext';
import ProfileContext from '../context/profile/profileContext';
import Menu from './Menu';

const Home = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);

  const {getProfileMe, profile, loading} = profileContext;

  // Get profile actual user
  useEffect(() => {
    getProfileMe();
  }, []);

  return (
    <Container>
      <Text style={styles.title}>Bienvenido!</Text>
      {/* User not have a profile */}
      {!profile && !loading && (
        <View style={styles.containerBox}>
          <Text style={styles.textProfile}>
            Para empezar debes crearte un perfil para realizar las reservas de
            consultas en la aplicación
          </Text>
          <View style={styles.btnCreateProfile}>
            <Button onPress={() => navigation.navigate('Profile')}>
              <Text>CREAR PERFIL</Text>
            </Button>
          </View>
        </View>
      )}

      {/* Users with profile */}
      {profile && !loading && (
        <>
          <View style={styles.containerBox}>
            <Text style={styles.titleMenu}>Elige una opción</Text>
          </View>
          {/* Menu selection */}
          <Menu navigation={navigation} />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  containerBox: {
    padding: 10,
  },
  textProfile: {textAlign: 'center', marginBottom: 20},
  btnCreateProfile: {alignSelf: 'center'},
  title: {
    fontWeight: 'bold',
    fontSize: 36,
    color: '#fb5b5a',
    marginTop: 20,
    textAlign: 'center',
  },
  titleMenu: {
    textAlign: 'left',
    fontSize: 20,
    color: '#fb5b5a',
    fontWeight: 'bold',
  },
  buttonLogoutSection: {
    alignSelf: 'center',
    marginTop: 40,
  },
});

export default Home;
