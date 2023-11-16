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
import {Card, Box, Button, Pressable} from 'native-base';
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
          <Text style={styles.titleMenu}>Seleccione el Día</Text>
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
            marginBottom: 10,
          }}>
          <FontAwesome5 name={'calendar'} color="#5067FF" size={20} />{' '}
          <Box
            style={{
              flexDirection: 'row',
              display: 'flex',
            }}>
            <Text style={{fontWeight: 'bold'}}>Fecha: </Text>
            <Text>{moment(item.date.slice(0, 10)).format('DD MMMM YYYY')}</Text>
          </Box>
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
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      <Box padding={5}>
        <View style={styles.containerBox}>
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
            style={{marginTop: 20, padding: 10}}
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        )}
      </Box>
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
    marginTop: 20,
  },
  textButtonRefresh: {
    color: 'white',
  },
  textProgress: {
    color: '#ffd600',
  },
  infoBox: {
    height: 60,
    flexDirection: 'column',
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
    fontSize: 24,
    color: '#52B0EA',
    fontWeight: 'bold',
  },
});

export default AddConsultation;
