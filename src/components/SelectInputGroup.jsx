import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Item, Label, Icon, Text, Picker} from 'native-base';

const SelectInputGroup = ({label, handleInput, error, value, options}) => {
  const optionsGroup = options.map((option) => {
    return (
      <Picker.Item key={option._id} label={option.label} value={option.value} />
    );
  });
  return (
    <>
      <Item picker style={{padding: 15}}>
        <Label>{label}</Label>
        <Picker
          mode="dropdown"
          placeholder="Selecciona una opción"
          placeholderStyle={{color: '#bfc6ea'}}
          selectedValue={value}
          onValueChange={handleInput}>
          {optionsGroup}
        </Picker>
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

SelectInputGroup.propTypes = {
  label: PropTypes.string,
  handleInput: PropTypes.func,
};

SelectInputGroup.defaultProps = {
  label: '',
  handleInput: null,
  value: '',
  options: [],
  error: false,
};

export default SelectInputGroup;
