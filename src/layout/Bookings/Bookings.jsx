import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Fab, Icon, Box, Card, Button} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import BookingContext from '../../context/bookigs/bookingContext';
import AuthContext from '../../context/auth/authContext';
import moment from 'moment';
import 'moment/locale/es';

const Bookings = ({navigation}) => {
  const bookingContext = useContext(BookingContext);
  const authContext = useContext(AuthContext);
  const {bookings, loading, getBookings} = bookingContext;
  const {user} = authContext;
  const [items, setItems] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {
    // Verify consultations in the booking of the user
    if (!loading && bookings && bookings.data && user && user.data) {
      const bookingsByUser = [];

      // Get bookings with solo booking data
      bookings.data.filter(booking => {
        if (!booking.state) {
          return booking.consultations.map(consultation => {
            if (consultation.user === user.data._id)
              bookingsByUser.push({
                _id: booking._id,
                date: booking.date,
                state: booking.state,
                consultation: {
                  _id: consultation._id,
                  createdAt: consultation.createdAt,
                  hourDate: consultation.hourDate,
                  number: consultation.number,
                  reserved: consultation.reserved,
                  user: consultation.user,
                  state: consultation.state,
                },
              });
          });
        }

        return booking;
      });

      setItems(bookingsByUser);
    }
  }, [loading, bookings]);

  const onRefreshItems = async () => {
    await getBookings();
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BookingDetails', {
            booking: item,
          })
        }>
        <Card>
          <Text>
            <FontAwesome5 name={'calendar'} color="#5067FF" size={20} />{' '}
          </Text>
          <Box>
            <Text style={styles.textDate}>Fecha de cita:</Text>
            <Text>{moment(item.date.slice(0, 10)).format('DD MMMM YYYY')}</Text>
            <Text note>
              Horario de la consulta: {item.consultation.hourDate}
            </Text>
          </Box>
          {item.consultation.state ? (
            <Text style={styles.textSuccess}>
              <FontAwesome5 name={'check-circle'} size={20} /> Completado
            </Text>
          ) : (
            <Text style={styles.textProgress}>
              <FontAwesome5 name={'check'} size={20} /> En Curso
            </Text>
          )}
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Text style={styles.titleMenu}>Mis Reserva de Citas Disponibles</Text>
        <View style={styles.infoBox}>
          <Text>Listado de las reservas que realizaste en Odontodent</Text>
          <Button
            style={styles.buttonRefresh}
            onPress={onRefreshItems}
            disabled={loading}>
            <Text style={styles.textButtonRefresh}>RECARGAR</Text>
          </Button>
        </View>
      </View>

      {/* List bookings reserved */}
      {!loading === false && items.length === 0 ? (
        <View style={styles.centerView}>
          <Text styles={styles.textItemsNotFound}>
            <FontAwesome5 name={'times-circle'} size={20} /> Lo sentimos, no
            encontramos ninguna reserva en tu lista
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.consultation._id}
        />
      )}

      {/* Button add */}
      <Fab
        active={true}
        direction="up"
        containerStyle={{}}
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => navigation.navigate('AddBooking')}>
        <Icon name="add" />
      </Fab>
    </View>
  );
};

const styles = StyleSheet.create({
  textProfile: {
    textAlign: 'center',
    marginBottom: 20,
  },
  textItemsNotFound: {
    textAlign: 'center',
  },
  textDate: {
    fontWeight: 'bold',
  },
  buttonRefresh: {
    padding: 10,
    margin: 10,
  },
  textSuccess: {
    color: '#32cd32',
  },
  infoBox: {
    height: 60,
    flexDirection: 'row',
  },
  submitBtn: {
    alignSelf: 'center',
    width: '30%',
    backgroundColor: '#fb5b5a',
    justifyContent: 'center',
  },
  textButtonRefresh: {
    color: 'white',
  },
  textProgress: {
    color: '#ffd600',
  },
  submitBtn: {
    alignSelf: 'center',
    width: '30%',
    justifyContent: 'center',
  },
  centerView: {
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
  titleMenu: {
    textAlign: 'left',
    fontSize: 20,
    color: '#fb5b5a',
    fontWeight: 'bold',
  },
});

export default Bookings;
