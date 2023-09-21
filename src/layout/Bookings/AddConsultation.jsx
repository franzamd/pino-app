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
import {Box, Card} from 'native-base';
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
            color="#fb5b5a"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 20,
          }}>
          <Text style={styles.titleMenu}>Detalles</Text>
        </View>
      </View>
    );
  }

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
        <Card
          onPress={() =>
            navigation.navigate('AddConsultation', {
              booking: item,
            })
          }
          rounded="8"
          overflow="hidden"
          borderWidth="1"
          borderColor="coolGray.300"
          maxW="96"
          shadow="3"
          bg="coolGray.100"
          p="5"
          style={{marginBottom: 10}}>
          <Box
            style={{
              flexDirection: 'row',
              display: 'flex',
              marginBottom: 10,
            }}>
            <FontAwesome5 name={'calendar'} color="#5067FF" size={20} />{' '}
            <Box>
              <Text>Horario de la consulta: {item.hourDate}</Text>
            </Box>
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
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      <Box padding={5}>
        <View style={styles.containerBox}>
          <Text style={styles.subtitleMenu}>Fecha {date}</Text>
          <Text>Horarios de Consultas</Text>
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
            style={{marginTop: 20}}
            data={booking?.consultations}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        )}
      </Box>
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
  containerBox: {},
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
    fontSize: 24,
    color: '#fb5b5a',
    fontWeight: 'bold',
  },
  subtitleMenu: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddBooking;
