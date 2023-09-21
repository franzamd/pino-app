import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import AuthContext from '../context/auth/authContext';
import {Thumbnail} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import ProfileContext from '../context/profile/profileContext';

// import {CommonActions} from '@react-navigation/native';

const DrawerContent = (props) => {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  const {profile, resetProfile} = profileContext;
  const {user, logout} = authContext;

  const name = profile && profile.data ? profile.data.name : '';
  const lastname = profile && profile.data ? profile.data.lastname : '';
  const role = user && user.data ? user.data.role : '';

  // const imgSrc =
  //   profile && profile.data && profile.data.file
  //     ? {uri: `http://10.0.2.2:5000/api/profiles/photo/${profile.data._id}`}
  //     : require('../assets/reserves.jpg');

  const imgSrc = require('../assets/nouser.png');

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* User info section*/}
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Thumbnail source={imgSrc} size={50} />
              <View style={{marginLeft: 15}}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.caption}>{lastname}</Text>
                <Text style={[styles.caption, styles.captionRole]}>{role}</Text>
              </View>
            </View>
          </View>
          {/* List options section  */}
          <View style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome5 name={'home'} color="#fb5b5a" size={30} />
              )}
              label="Home"
              onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <FontAwesome5 name={'address-card'} color="#fb5b5a" size={30} />
              )}
              label="Mi Perfil"
              onPress={() => props.navigation.navigate('Profile')}
            />

            {profile && profile.data && (
              <DrawerItem
                icon={({color, size}) => (
                  <FontAwesome5 name={'laptop'} color="#fb5b5a" size={30} />
                )}
                label="Mis Reservas"
                onPress={() => props.navigation.navigate('Bookings')}
              />
            )}
          </View>
        </View>
      </DrawerContentScrollView>
      {/* Bottom info section */}
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <FontAwesome5 name={'sign-out'} color="#fb5b5a" size={30} />
          )}
          label="Cerrar Sesión"
          onPress={async () => {
            await resetProfile();
            await logout();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    marginBottom: 5,
  },
  captionRole: {
    color: '#fb5b5a',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
export default DrawerContent;
