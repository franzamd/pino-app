import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Fab, Icon, Box, Pressable, Button} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';

import BookingContext from '../../context/bookigs/bookingContext';
import AuthContext from '../../context/auth/authContext';
import moment from 'moment';
import 'moment/locale/es';

const Bookings = ({navigation}) => {
  const bookingContext = useContext(BookingContext);
  const authContext = useContext(AuthContext);
  const {bookings, loading, getBookings} = bookingContext;
  const [fabDisplay, setFabDisplay] = useState(true);
  const {user} = authContext;
  const [items, setItems] = useState([]);

  useEffect(() => {
    getBookings();

    return () => {};
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setFabDisplay(true);
    }, []),
  );

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
          <Text style={styles.titleMenu}>Mis Reservas de Citas</Text>
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
      // <TouchableOpacity
      //   onPress={() =>
      //     navigation.navigate('BookingDetails', {
      //       booking: item,
      //     })
      //   }>
      <Pressable
        onPress={() =>
          navigation.navigate('BookingDetails', {
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
        {/* <Card> */}
        <Box
          style={{
            flexDirection: 'row',
            display: 'flex',
          }}>
          <FontAwesome5 name={'calendar'} color="#5067FF" size={20} />{' '}
          <Box
            style={{
              flexDirection: 'row',
              display: 'flex',
            }}>
            <Text style={styles.textDate}>Fecha: </Text>
            <Text>{moment(item.date.slice(0, 10)).format('DD MMMM YYYY')}</Text>
          </Box>
        </Box>
        <Box style={{marginBottom: 10}}>
          <Text>Horario de la consulta: {item.consultation.hourDate}</Text>
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
        {/* </Card> */}
        {/* // </TouchableOpacity> */}
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      {renderHeader()}
      <Box padding={5}>
        <View style={styles.containerBox}>
          <View style={styles.infoBox}>
            <Text>
              Listado de las reservas que realizaste en Centro Odontológico Pino
            </Text>
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
            style={{marginTop: 20, padding: 10}}
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.consultation._id}
          />
        )}

        {/* Button add */}
        {fabDisplay && (
          <Fab
            position="absolute"
            onPress={() => {
              setFabDisplay(false);
              navigation.navigate('AddBooking');
            }}
            icon={<Icon color="white" as={<FontAwesome5 name={'plus'} />} />}
          />
        )}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  textItemsNotFound: {
    textAlign: 'center',
  },
  textDate: {
    fontWeight: 'bold',
  },
  buttonRefresh: {
    padding: 10,
    marginTop: 20,
  },
  textSuccess: {
    color: '#32cd32',
  },
  infoBox: {
    height: 60,
    flexDirection: 'column',
  },
  submitBtn: {
    alignSelf: 'center',
    width: '30%',
    backgroundColor: '#52B0EA',
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
    backgroundColor: 'orange',
  },
  containerBox: {
    padding: 10,
  },
  titleMenu: {
    textAlign: 'left',
    fontSize: 24,
    color: '#52B0EA',
    fontWeight: 'bold',
  },
});

export default Bookings;
