import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Card, Box, Left, Body, Button} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import BookingContext from '../../context/bookigs/bookingContext';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

const AddConsultation = ({navigation}) => {
  const bookingContext = useContext(BookingContext);
  const {bookings, loading, getBookings} = bookingContext;
  const [items, setItems] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {
    if (!loading && bookings && bookings.data) {
      // Get consultations available
      setItems(bookings.data.filter(item => !item.state));
    }
  }, [loading, bookings]);

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
    // navigation.goBack(null);
  };

  const onRefreshItems = async () => {
    await getBookings();
  };

  // if (loading) {
  //   return (
  //     <View style={styles.centerView}>
  //       <ActivityIndicator size="large" color="black" />
  //     </View>
  //   );
  // }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddConsultation', {
            booking: item,
          })
        }>
        <Card>
          <Box>
            <Text>
              <FontAwesome5 name={'calendar'} color="#5067FF" size={20} />{' '}
            </Text>
            <Box>
              <Text style={{fontWeight: 'bold'}}>Fecha de cita</Text>
              <Text>
                {moment(item.date.slice(0, 10)).format('DD MMMM YYYY')}
              </Text>
            </Box>
            {item.state ? (
              <Text style={styles.textActive}>
                <FontAwesome5 name={'check-circle'} size={20} /> Completado
              </Text>
            ) : (
              <Text style={styles.textProgress}>
                <FontAwesome5 name={'check'} size={20} /> En Curso
              </Text>
            )}
          </Box>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <Text style={styles.titleMenu}>Seleccione el Día de la Reserva</Text>
        <View style={styles.infoBox}>
          <Text>Listado de las reservas disponibles para consultas</Text>
          <Button
            style={styles.buttonRefresh}
            onPress={onRefreshItems}
            disabled={loading}>
            <Text style={styles.textButtonRefresh}>RECARGAR</Text>
          </Button>
        </View>
      </View>

      {!loading && items.length === 0 ? (
        <View style={styles.centerView}>
          {/* <Text style={styles.textItemsNotFound}>
            <FontAwesome5 name={'times-circle'} size={20} /> Lo sentimos, no
            encontramos ninguna reserva en los siguientes días
          </Text> */}
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textActive: {
    color: '#32cd32',
  },
  textButton: {
    color: 'white',
  },
  textItemsNotFound: {
    textAlign: 'center',
  },
  buttonRefresh: {
    padding: 10,
    margin: 10,
  },
  textButtonRefresh: {
    color: 'white',
  },
  textProgress: {
    color: '#ffd600',
  },
  infoBox: {
    height: 60,
    flexDirection: 'row',
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItemsNotFound: {
    textAlign: 'center',
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

export default AddConsultation;
