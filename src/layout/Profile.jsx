import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Button, Box, Image} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';

import InputGroup from '../components/InputGroup';
import ProfileContext from '../context/profile/profileContext';
import TextErrorGlobal from '../components/TextErrorGlobal';

const Profile = ({navigation}) => {
  const profileContext = useContext(ProfileContext);
  const {
    error,
    loading,
    getProfileMe,
    createProfileMe,
    updateProfileMe,
    profile: profileUser,
  } = profileContext;
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    lastname: '',
    ci: '',
    phone: '',
    description: '',
    filePreview: null,
    file: '',
  });
  const [isModeUpdate, setIsModeUpdate] = useState(false);

  useEffect(() => {
    getProfileMe();
  }, []);

  useEffect(() => {
    if (!loading && profileUser && profileUser.data) {
      setProfile({
        ...profile,
        id: profileUser.data._id ? profileUser.data._id : null,
        name: profileUser.data.name ? profileUser.data.name : '',
        lastname: profileUser.data.lastname ? profileUser.data.lastname : '',
        ci: profileUser.data.ci ? profileUser.data.ci : '',
        phone: profileUser.data.phone ? profileUser.data.phone : '',
        file: profileUser.data.file ? profileUser.data.file : '',
        description: profileUser.data.description
          ? profileUser.data.description
          : '',
      });
      setIsModeUpdate(true);
    }
  }, [loading]);

  const handleInput = (value, name) => {
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const formData = {
      name: profile.name,
      lastname: profile.lastname,
      ci: profile.ci,
      phone: profile.phone,
      description: profile.description,
    };

    if (isModeUpdate) {
      // Update profile existing
      // await updateProfileMe(formData, profile.file.uri, navigation);
      await updateProfileMe(formData, navigation);
    } else {
      // Create a new profile
      await createProfileMe(formData, navigation);
    }
  };

  const imgSrc = require('../assets/nouser.png');

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          marginTop: 24,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <FontAwesome5
            name={'chevron-left'}
            color="#52B0EA"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 20,
          }}>
          <Text style={styles.titleMenu}>Mi Perfil</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box padding={5}>
          {/* Image section */}
          <View style={styles.imageSection}>
            <Image source={imgSrc} style={styles.imgSize} alt="image" />
          </View>
          {/* Information section */}
          <InputGroup
            error={error && error.name}
            label="Nombres"
            value={profile.name}
            handleInput={value => handleInput(value, 'name')}
          />
          <InputGroup
            error={error && error.lastname}
            label="Apellidos"
            value={profile.lastname}
            handleInput={value => handleInput(value, 'lastname')}
          />
          <InputGroup
            error={error && error.ci}
            label="C.I."
            value={profile.ci}
            handleInput={value => handleInput(value, 'ci')}
          />
          <InputGroup
            error={error && error.phone}
            label="Teléfono"
            value={profile.phone}
            handleInput={value => handleInput(value, 'phone')}
          />
          <TextErrorGlobal error={error} />

          <View style={styles.buttonsBox}>
            <Button
              style={styles.submitBtn}
              onPress={onSubmit}
              disabled={loading}>
              <Text style={styles.textBtnSubmit}>ACEPTAR</Text>
            </Button>
          </View>
        </Box>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleMenu: {
    textAlign: 'left',
    fontSize: 24,
    color: '#52B0EA',
    fontWeight: 'bold',
  },
  imageSection: {
    height: 150,
    alignItems: 'center',
    padding: 10,
  },
  imgSize: {
    width: 100,
    height: 100,
  },
  textImgPreview: {
    marginTop: 10,
  },
  infoAdditionalBox: {
    marginTop: 20,
    marginLeft: 20,
  },
  textInfoAditional: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#52B0EA',
  },
  buttonsBox: {
    marginVertical: 30,
  },
  informationSection: {
    backgroundColor: 'orange',
  },
  submitBtn: {
    alignSelf: 'center',
    width: '30%',
    justifyContent: 'center',
  },
  textBtnSubmit: {
    color: 'white',
  },
});

export default Profile;
