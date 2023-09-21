import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button, Container, Center, FormControl, Box, Image} from 'native-base';
import InputGroup from '../components/InputGroup';
import ProfileContext from '../context/profile/profileContext';

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

  return (
    <Container>
      <Text style={styles.logo}>Mi Perfil</Text>
      {/* Image section */}
      <View style={styles.imageSection}>
        {/* <TouchableOpacity onPress={handleInputImage}> */}
        <Image source={imgSrc} style={styles.imgSize} />
        {/* </TouchableOpacity> */}
        <Box style={styles.textImgPreview}>
          <Text>{profile.name}</Text>
          <Text note>{profile.lastname}</Text>
        </Box>
      </View>
      {/* Information section */}
      <Center>
        <FormControl>
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
          <View style={styles.buttonsBox}>
            <Button
              style={styles.submitBtn}
              onPress={onSubmit}
              disabled={loading}>
              <Text style={styles.textBtnSubmit}>ACEPTAR</Text>
            </Button>
          </View>
        </FormControl>
      </Center>
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    color: '#fb5b5a',
    marginBottom: 20,
  },
  imageSection: {
    height: 180,
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
    color: '#fb5b5a',
  },
  buttonsBox: {
    marginVertical: 40,
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
