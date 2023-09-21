import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Alert, BackHandler} from 'react-native';
import {Card, Box, Text, Button} from 'native-base';
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

  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Text style={styles.titleMenu}>Detalles de la Consulta</Text>
      </View>

      {/* Card Information about Booking info*/}
      <Card>
        <Box>
          <Box>
            <Text>
              <FontAwesome5 name={'calendar'} color="#5067FF" size={20} />{' '}
            </Text>
            <Box>
              <Text style={styles.textDate}>Fecha de cita</Text>
              <Text>
                {booking?.date
                  ? moment(booking.date.slice(0, 10)).format('DD MMMM YYYY')
                  : ''}
              </Text>
              <Text note>
                Horario de la consulta: {booking?.consultation?.hourDate}
              </Text>
              <Text note>
                Reservado:{' '}
                {booking?.consultation
                  ? booking(booking.consultation.date).format(
                      'DD MMM YYYY, LTS a',
                    )
                  : ''}
              </Text>
            </Box>
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
        </Box>
        {!booking?.consultation?.state && (
          <View style={styles.buttonsBox}>
            <Button
              style={styles.submitBtn}
              onPress={onUnselected}
              disabled={loading}>
              <Text style={styles.textBtnSubmit}>Eliminar Reserva</Text>
            </Button>
          </View>
        )}
      </Card>
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
    width: '30%',
    backgroundColor: '#fb5b5a',
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
  buttonsBox: {
    marginVertical: 20,
  },
  textBtnSubmit: {
    color: 'white',
  },
  titleMenu: {
    textAlign: 'left',
    fontSize: 20,
    color: '#fb5b5a',
    fontWeight: 'bold',
  },
});

export default BookingDetails;
