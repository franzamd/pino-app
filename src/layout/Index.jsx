import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthContext from '../context/auth/authContext';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Bookings from './Bookings/Bookings';
import AddBooking from './Bookings/AddBooking';
import BookingDetails from './Bookings/BookingDetails';
import Profile from './Profile';
import AddConsultation from './Bookings/AddConsultation';
// import DrawerContent from './DrawerContent';

const Stack = createNativeStackNavigator();

const Index = ({route, navigation, ...rest}, props) => {
  const authContext = useContext(AuthContext);
  const {loading, isAuthenticated, user, logout} = authContext;

  useEffect(() => {
    authContext.loadUser();
  }, []);

  useEffect(() => {
    // Check if user are blocked
    if (!loading) {
      if (user && user.data && !user.data.state) {
        logout();
      }
    }

    // eslint-disable-next-line
  }, [loading]);

  // if (loading) {
  return (
    // <View style={styles.spinner}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animationTypeForReplace: !isAuthenticated ? 'pop' : 'push',
          }}
        />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
    // </View>
  );
  // }

  // return (
  //   <NavigationContainer>
  //     {isAuthenticated && user && (
  //       <>
  //         <Drawer.Navigator
  //           drawerContent={(props) => <DrawerContent {...props} />}
  //           initialRouteName="Home"
  //           screenOptions={{headerShown: false}}>
  //           {/* User signed in */}
  //           <>
  //             <Drawer.Screen name="Home" component={Home} />
  //             <Drawer.Screen
  //               name="Profile"
  //               component={Profile}
  //               options={{title: 'Perfil'}}
  //             />
  //             <Drawer.Screen
  //               name="Bookings"
  //               component={Bookings}
  //               options={{title: 'Reservas'}}
  //             />
  //             <Drawer.Screen
  //               name="AddBooking"
  //               component={AddBooking}
  //               options={{title: 'Añadir Reserva'}}
  //             />
  //             <Drawer.Screen
  //               name="AddConsultation"
  //               component={AddConsultation}
  //               options={{title: 'Añadir Consulta'}}
  //             />
  //             <Drawer.Screen
  //               name="BookingDetails"
  //               component={BookingDetails}
  //               options={{title: 'Detalles de la Consulta'}}
  //             />
  //           </>
  //         </Drawer.Navigator>
  //       </>
  //     )}

  //     {/* User is not signed in */}
  //     {!isAuthenticated && !user && !loading && (
  //       <Stack.Navigator screenOptions={{headerShown: false}}>
  //         <Stack.Screen
  //           name="Login"
  //           component={Login}
  //           options={{
  //             animationTypeForReplace: !isAuthenticated ? 'pop' : 'push',
  //           }}
  //         />
  //         <Stack.Screen name="Register" component={Register} />
  //       </Stack.Navigator>
  //     )}
  //   </NavigationContainer>
  // );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fb5b5a',
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonLogoutSection: {
    alignSelf: 'center',
  },
});

export default Index;