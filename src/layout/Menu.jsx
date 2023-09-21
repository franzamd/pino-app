import React from 'react';
import {Container, Box, Text, Pressable, Flex} from 'native-base';

const Menu = ({navigation}) => {
  return (
    <Container>
      <Box alignItems="center">
        <Pressable
          onPress={() => navigation.navigate('Bookings')}
          rounded="8"
          overflow="hidden"
          borderWidth="1"
          borderColor="coolGray.300"
          maxW="96"
          shadow="3"
          bg="coolGray.100"
          p="5">
          <Box>
            <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
              Reservas Citas
            </Text>
            <Text mt="2" fontSize="sm" color="coolGray.700">
              Reserva aqui tu atención para acceder a la consulta
            </Text>
            <Flex>
              <Text
                mt="2"
                fontSize={12}
                fontWeight="medium"
                color="darkBlue.600">
                Reservar
              </Text>
            </Flex>
          </Box>
        </Pressable>
      </Box>
    </Container>
  );
};

export default Menu;
