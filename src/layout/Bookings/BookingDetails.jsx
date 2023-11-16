import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Alert, BackHandler} from 'react-native';
import {Card, Box, Text, Button, Pressable} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import BookingContext from '../../context/bookigs/bookingContext';
import moment from 'moment';
import 'moment/locale/es';

const BookingDetails = ({navigation, route}) => {
  const bookingContext = useContext(BookingContext);
  const {loading, getBookings, deleteConsultation} = bookingContext;

  const booking = route.params?.booking;
  const date =
    (route.params?.booking &&
      moment(route.params.booking.date.slice(0, 10)).format('DD MMMM YYYY')) ||
    moment().format('DD MMMM YYYY');

  const onUnselected = () => {
    if ((booking._id, booking.consultation._id)) {
      Alert.alert(
        'Confirmar Acción',
        `Estas seguro de eliminar la reserva la consulta ${date} a horas ${booking.consultation.hourDate} ?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await deleteConsultation(
                booking._id,
                booking.consultation._id,
                navigation,
              );
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

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

  // Render
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
          <Text style={styles.titleMenu}>Detalles de la Consulta</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* Card Information about Booking info*/}
      <Box padding={5}>
        <Pressable
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
            }}>
            <FontAwesome5 name={'calendar'} color="#5067FF" size={20} />{' '}
            <Text style={styles.textDate}>Fecha de cita: </Text>
            <Text>
              {booking?.date
                ? moment(booking.date.slice(0, 10)).format('DD MMMM YYYY')
                : ''}
            </Text>
          </Box>
          <Text>Horario de la consulta: {booking?.consultation?.hourDate}</Text>
          <Text>
            Reservado:{' '}
            {booking?.consultation?.date
              ? booking(booking.consultation.date).format('DD MMM YYYY, LTS a')
              : ''}
          </Text>
          <Box style={{marginBottom: 10}}>
            {booking?.consultation?.state ? (
              <Text style={styles.textActive}>
                <FontAwesome5 name={'check-circle'} size={20} /> Completado
              </Text>
            ) : (
              <Text style={styles.textProgress}>
                <FontAwesome5 name={'check'} size={20} /> En Curso
              </Text>
            )}
          </Box>
          {!booking?.consultation?.state && (
            <Button
              style={styles.submitBtn}
              onPress={onUnselected}
              disabled={loading}>
              <Text style={styles.textBtnSubmit}>Eliminar Reserva</Text>
            </Button>
          )}
        </Pressable>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  textProfile: {textAlign: 'center', marginBottom: 20},
  textActive: {
    color: '#32cd32',
  },
  textDate: {
    fontWeight: 'bold',
  },
  textButton: {
    color: 'white',
  },
  submitBtn: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#52B0EA',
    justifyContent: 'center',
  },
  textProgress: {
    color: '#ffd600',
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  containerBox: {
    padding: 10,
  },
  textBtnSubmit: {
    color: 'white',
  },
  titleMenu: {
    textAlign: 'left',
    fontSize: 20,
    color: '#52B0EA',
    fontWeight: 'bold',
  },
});

export default BookingDetails;
