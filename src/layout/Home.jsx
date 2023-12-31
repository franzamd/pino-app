import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, Alert} from 'react-native';
import {Box, View, Button} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import ProfileContext from '../context/profile/profileContext';
import AuthContext from '../context/auth/authContext';
import Menu from './Menu';

const Home = ({navigation}) => {
  const profileContext = useContext(ProfileContext);
  const authContext = useContext(AuthContext);

  const {getProfileMe, profile, loading} = profileContext;
  const {logout} = authContext;

  // Get profile actual user
  useEffect(() => {
    getProfileMe();
  }, []);

  // Render
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
          paddingHorizontal: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <FontAwesome5
            name={'sign-out'}
            color="#52B0EA"
            size={30}
            style={{marginRight: 30}}
            onPress={() => {
              Alert.alert(
                'Confirmar Acción',
                '¿Estás seguro de cerrar sesión?',
                [
                  {
                    text: 'Cancelar',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: async () => {
                      await logout();
                    },
                  },
                ],
              );
            }}
          />
          <FontAwesome5
            name={'user'}
            color="#52B0EA"
            size={30}
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      <Box padding={5}>
        {/* User not have a profile */}
        {!profile && !loading && (
          <View style={styles.containerBox}>
            <Text style={styles.textProfile}>
              Para empezar debes crearte un perfil para realizar las reservas de
              consultas en la aplicación
            </Text>
            <View style={styles.btnCreateProfile}>
              <Button onPress={() => navigation.navigate('Profile')}>
                <Text style={{color: 'white'}}>Crear Perfil</Text>
              </Button>
            </View>
          </View>
        )}

        {/* Users with profile */}
        {profile && !loading && (
          <Box>
            <View style={styles.containerBox}>
              <Text style={styles.titleMenu}>Elige una opción</Text>
            </View>
            {/* Menu selection */}
            <Menu navigation={navigation} />
          </Box>
        )}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBox: {
    padding: 10,
  },
  textProfile: {textAlign: 'center', marginBottom: 20},
  btnCreateProfile: {alignSelf: 'center'},
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#52B0EA',
    textAlign: 'center',
  },
  titleMenu: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonLogoutSection: {
    alignSelf: 'center',
    marginTop: 40,
  },
});

export default Home;
