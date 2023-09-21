import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Button} from 'react-native';
import {Item, Label, Icon, Text} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DateInputGroup = ({
  label,
  handleInput,
  error,
  value,
  mode,
  show,
  onPressBtn,
}) => {
  return (
    <>
      <Item picker style={{padding: 15}}>
        <Label>{label}</Label>
        <Text>{moment(value).format('L')}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={handleInput}
          />
        )}
        <View style={{marginLeft: 'auto'}}>
          <Button onPress={onPressBtn} title="Seleccionar" />
        </View>
        {error && <Icon name="close" color="red"></Icon>}
      </Item>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginLeft: 16,
  },
});

DateInputGroup.propTypes = {
  label: PropTypes.string,
  handleInput: PropTypes.func,
};

DateInputGroup.defaultProps = {
  label: '',
  handleInput: null,
  value: new Date(),
  error: false,
};

export default DateInputGroup;
