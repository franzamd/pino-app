import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Box, CardItem} from 'native-base';
import AuthContext from '../../context/auth/authContext';
import BookingContext from '../../context/bookigs/bookingContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const AddBooking = ({navigation, route}) => {
  const authContext = useContext(AuthContext);
  const bookingContext = useContext(BookingContext);
  const {user} = authContext;
  const {
    selectConsultation,
    booking: bookingData,
    loading,
    getBookings,
  } = bookingContext;
  const booking = route.params?.booking;
  const date = route.params?.booking
    ? moment(route.params.booking.date.slice(0, 10)).format('DD MMMM YYYY')
    : moment().format('DD MMMM YYYY');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleBackButtonClick = () => {
    getBookings();
  };

  const onSubmit = (e, consultation) => {
    // Verify if consultation has reserved
    if (consultation.reserved) {
      return Alert.alert(
        'Ups! Lo sentimos',
        'No puedes seleccionar este horario por que ya fue seleccionado por otro usuario, por favor selecciona otro disponible.',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    }

    // Verify if user exist
    if (user && user.data) {
      return Alert.alert(
        'Confirmar Acción',
        `Estas seguro de seleccionar este horario de consulta ${date} a horas ${consultation.hourDate} ?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const formData = {
                _id: consultation._id,
                user: user.data._id,
              };
              await selectConsultation(booking._id, formData, navigation);
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.centerView}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={e => onSubmit(e, item)}>
        <Box>
          <CardItem>
            <Box>
              <Text>
                <FontAwesome5 name={'calendar'} color="#5067FF" size={20} />{' '}
              </Text>
              <Box>
                <Text note>Horario de la consulta: {item.hourDate}</Text>
              </Box>
              {item.reserved ? (
                <Text style={styles.textReserved}>
                  <FontAwesome5 name={'times-circle'} size={20} /> Reservado
                </Text>
              ) : (
                <Text style={styles.textAvailable}>
                  <FontAwesome5 name={'check'} size={20} /> Disponible
                </Text>
              )}
            </Box>
          </CardItem>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Text style={styles.titleMenu}>Fecha {date}</Text>
        <Text style={styles.titleMenu}>Horarios de Consultas</Text>
      </View>

      {booking?.consultations?.length === 0 ? (
        <View style={styles.centerView}>
          {/* <Text style={styles.textItemsNotFound}>
            <FontAwesome5 name={'times-circle'} size={20} /> Lo sentimos, no
            encontramos ninguna consulta por reservar
          </Text> */}
        </View>
      ) : (
        <FlatList
          data={booking?.consultations}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textReserved: {
    color: '#f5365c',
  },
  textAvailable: {
    color: '#11cdef',
  },
  containerBox: {
    padding: 10,
  },
  textItemsNotFound: {
    textAlign: 'center',
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleMenu: {
    textAlign: 'left',
    fontSize: 20,
    color: '#fb5b5a',
    fontWeight: 'bold',
  },
});

export default AddBooking;
